// index.js
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

const { state, saveState } = useSingleFileAuthState('./auth_info.json'); // Guarda sesión para no pedir QR
const groupBan = JSON.parse(fs.readFileSync('./database/groupBan.json') || '[]');
const userBan = JSON.parse(fs.readFileSync('./database/userBan.json') || '[]');

const ADMIN = '573163963499@s.whatsapp.net'; // Cambia al número del admin

// Menú principal
const menu = `
*🤖 MENU DEL BOT*
1. Ban chat: /banchat <chat_id>
2. Ban user: /banuser <numero>
3. Ver menú: /menu
`;

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false // No pide QR si ya existe auth_info.json
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === 'close') {
            const reason = (lastDisconnect.error)?.output?.statusCode;
            if(reason !== DisconnectReason.loggedOut) startBot();
            else console.log('Sesión cerrada. Necesita re-autenticarse.');
        }
        else if(connection === 'open') console.log('Bot conectado correctamente!');
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if(!msg.message || msg.key.fromMe) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if(!text) return;

        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;

        // Ignorar usuarios o grupos baneados
        if(userBan.includes(sender) || groupBan.includes(from)) return;

        // Comandos solo para admin
        if(sender === ADMIN) {
            if(text.startsWith('/banchat')) {
                const chatId = text.split(' ')[1];
                if(chatId) {
                    if(!groupBan.includes(chatId)) groupBan.push(chatId);
                    fs.writeFileSync('./database/groupBan.json', JSON.stringify(groupBan));
                    await sock.sendMessage(from, { text: `Chat ${chatId} ha sido baneado ✅` });
                }
            }

            if(text.startsWith('/banuser')) {
                const userId = text.split(' ')[1] + '@s.whatsapp.net';
                if(userId) {
                    if(!userBan.includes(userId)) userBan.push(userId);
                    fs.writeFileSync('./database/userBan.json', JSON.stringify(userBan));
                    await sock.sendMessage(from, { text: `Usuario ${userId} ha sido baneado ✅` });
                }
            }
        }

        // Menú general
        if(text === '/menu') {
            await sock.sendMessage(from, { text: menu });
        }
    });
}

startBot();
