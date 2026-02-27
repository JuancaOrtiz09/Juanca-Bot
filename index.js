// index.js
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, MessageType } = require('@adiwajshing/baileys');
const fs = require('fs');

const { state, saveState } = useSingleFileAuthState('./auth_info.json'); // Mantiene sesión
const groupBan = JSON.parse(fs.readFileSync('./database/groupBan.json') || '[]');
const userBan = JSON.parse(fs.readFileSync('./database/userBan.json') || '[]');

const ADMIN = '573163963499@s.whatsapp.net'; // Número del admin

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
