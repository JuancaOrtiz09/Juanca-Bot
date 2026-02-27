// index.js
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, MessageType } = require('@adiwajshing/baileys');
const fs = require('fs');

const { state, saveState } = useSingleFileAuthState('./auth_info.json'); // Mantiene sesión
const groupBan = JSON.parse(fs.readFileSync('./database/groupBan.json') || '[]');
const userBan = JSON.parse(fs.readFileSync('./database/userBan.json') || '[]');

const ADMIN = '573163963499@s.whatsapp.net'; // Número del admin
// Manejo de monedas y juegos
const coinsFile = './database/coins.json';

// Función para obtener saldo
function getCoins(userId) {
    let coins = JSON.parse(fs.readFileSync(coinsFile) || '{}');
    if(!coins[userId]) coins[userId] = 100; // saldo inicial
    fs.writeFileSync(coinsFile, JSON.stringify(coins));
    return coins[userId];
}

// Función para actualizar saldo
function updateCoins(userId, amount) {
    let coins = JSON.parse(fs.readFileSync(coinsFile) || '{}');
    if(!coins[userId]) coins[userId] = 100;
    coins[userId] += amount;
    if(coins[userId] < 0) coins[userId] = 0;
    fs.writeFileSync(coinsFile, JSON.stringify(coins));
    return coins[userId];
}

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === 'close') {
            const reason = (lastDisconnect.error)?.output?.statusCode;
            if(reason !== DisconnectReason.loggedOut) startBot();
            else console.log('Sesión cerrada, necesita re-autenticarse.');
        }
        else if(connection === 'open') console.log('Bot conectado ✅');
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if(!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

        // Ignorar usuarios o grupos baneados
        if(userBan.includes(sender) || groupBan.includes(from)) return;

        // Comandos para admin con botones
        if(sender === ADMIN) {
            if(text === '/menu') {
                const buttons = [
                    { buttonId: 'banchat', buttonText: { displayText: '🚫 Ban Chat' }, type: 1 },
                    { buttonId: 'banuser', buttonText: { displayText: '❌ Ban User' }, type: 1 },
                    { buttonId: 'help', buttonText: { displayText: 'ℹ️ Ayuda' }, type: 1 }
                ];

                const buttonMessage = {
                    text: 'Elige una opción:',
                    buttons: buttons,
                    headerType: 1
                };

                await sock.sendMessage(from, buttonMessage);
            }
        }

        // Responder a botones
        if(msg.message?.buttonsResponseMessage) {
            const buttonId = msg.message.buttonsResponseMessage.selectedButtonId;

            if(buttonId === 'banchat') {
                await sock.sendMessage(from, { text: 'Envía el chat ID que quieres banear:' });
                sock.ev.once('messages.upsert', async ({ messages }) => {
                    const chatIdMsg = messages[0].message.conversation;
                    if(!groupBan.includes(chatIdMsg)) groupBan.push(chatIdMsg);
                    fs.writeFileSync('./database/groupBan.json', JSON.stringify(groupBan));
                    await sock.sendMessage(from, { text: `Chat ${chatIdMsg} baneado ✅` });
                });
            }

            if(buttonId === 'banuser') {
                await sock.sendMessage(from, { text: 'Envía el número del usuario (ej: 5731xxxxxxx):' });
                sock.ev.once('messages.upsert', async ({ messages }) => {
                    if(text.toLowerCase() === '.owner') {
    const ownerNumber = '573163963499'; // tu número
    const waLink = `https://wa.me/${ownerNumber}`;

    const message = `
📞 Contacto del propietario:
Número: ${ownerNumber}
Puedes hacer clic aquí para escribirme directamente:
${waLink}
    
💡 Usa este comando si quieres dar una idea, reportar un problema o necesitas ayuda.
`;

    await sock.sendMessage(from, { text: message });
                    }
                    if(sender === ADMIN && text.startsWith('/coins')) {
    const args = text.split(' ');
    if(args.length !== 4) {
        await sock.sendMessage(from, { text: 'Uso correcto: /coins <numero> <cantidad> <add/remove>' });
        return;
    }

    const targetNumber = args[1] + '@s.whatsapp.net';
    const amount = parseInt(args[2]);
    const action = args[3].toLowerCase();

    if(isNaN(amount) || amount <= 0) {
        await sock.sendMessage(from, { text: 'Cantidad inválida.' });
        return;
    }

    if(action === 'add') {
        const newBalance = updateCoins(targetNumber, amount);
        await sock.sendMessage(from, { text: `✅ Se han sumado ${amount} monedas a ${targetNumber}. Nuevo saldo: ${newBalance}` });
    } 
    else if(action === 'remove') {
        const newBalance = updateCoins(targetNumber, -amount);
        await sock.sendMessage(from, { text: `✅ Se han restado ${amount} monedas a ${targetNumber}. Nuevo saldo: ${newBalance}` });
    } 
    else {
        await sock.sendMessage(from, { text: 'Acción inválida. Usa add o remove.' });
    }
                    }
                    if(text.startsWith('/balance')) {
    const balance = getCoins(sender);
    await sock.sendMessage(from, { text: `💰 Tu saldo: ${balance} monedas.` });
}

if(text.startsWith('/flip')) {
    const args = text.split(' ');
    const bet = parseInt(args[1]);
    if(isNaN(bet) || bet <= 0) {
        await sock.sendMessage(from, { text: 'Debes apostar un número válido de monedas.' });
    } else if(getCoins(sender) < bet) {
        await sock.sendMessage(from, { text: 'No tienes suficientes monedas para apostar eso.' });
    } else {
        // Cara o cruz aleatorio
        const result = Math.random() < 0.5 ? 'cara' : 'cruz';
        const win = Math.random() < 0.5; // 50% chance
        if(win) {
            const newBalance = updateCoins(sender, bet); // ganas lo apostado
            await sock.sendMessage(from, { text: `🎉 Salió ${result}, ganaste ${bet} monedas!\nNuevo saldo: ${newBalance}` });
        } else {
            const newBalance = updateCoins(sender, -bet);
            await sock.sendMessage(from, { text: `😢 Salió ${result}, perdiste ${bet} monedas.\nNuevo saldo: ${newBalance}` });
        }
    }
}

if(text.startsWith('/lottery')) {
    const args = text.split(' ');
    const bet = parseInt(args[1]);
    if(isNaN(bet) || bet <= 0) {
        await sock.sendMessage(from, { text: 'Debes apostar un número válido de monedas.' });
    } else if(getCoins(sender) < bet) {
        await sock.sendMessage(from, { text: 'No tienes suficientes monedas para apostar eso.' });
    } else {
        const win = Math.random() < 0.5; // 50% chance
        if(win) {
            const newBalance = updateCoins(sender, bet*2);
            await sock.sendMessage(from, { text: `🎉 ¡Felicidades! Ganaste ${bet*2} monedas!\nNuevo saldo: ${newBalance}` });
        } else {
            const newBalance = updateCoins(sender, -bet);
            await sock.sendMessage(from, { text: `😢 Perdiste ${bet} monedas.\nNuevo saldo: ${newBalance}` });
        }
    }
}
                    const userIdMsg = messages[0].message.conversation + '@s.whatsapp.net';
                    if(!userBan.includes(userIdMsg)) userBan.push(userIdMsg);
                    fs.writeFileSync('./database/userBan.json', JSON.stringify(userBan));
                    await sock.sendMessage(from, { text: `Usuario ${userIdMsg} baneado ✅` });
                });
            }

            if(buttonId === 'help') {
                await sock.sendMessage(from, { text: 'Bot de administración: usa los botones para banear chats o usuarios.' });
            }
        }

        // Mensaje de bienvenida general
        if(text.toLowerCase() === 'hola') {
            await sock.sendMessage(from, { text: '¡Hola! Soy tu bot 🤖\nEscribe /menu para ver opciones.' });
        }
    });
}

startBot();
