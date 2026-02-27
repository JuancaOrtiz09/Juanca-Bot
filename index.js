const { default: makeWASocket, useSingleFileAuthState, fetchLatestBaileysVersion, DisconnectReason, makeInMemoryStore } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

// Crear store para manejar chats
const store = makeInMemoryStore({ logger: console });
store.readFromFile('./store.json');
setInterval(() => store.writeToFile('./store.json'), 10000);

async function startBot() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true
    });

    store.bind(sock.ev);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) qrcode.generate(qr, { small: true });
        if (connection === 'close') {
            if ((lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
                startBot();
            } else {
                console.log('Sesión cerrada, necesita re-autenticarse.');
            }
        } else if (connection === 'open') {
            console.log('Bot conectado correctamente!');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const messageText = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!messageText) return;

        if (messageText.toLowerCase() === 'hola') {
            await sock.sendMessage(msg.key.remoteJid, { text: '¡Hola! Soy tu bot 🤖' });
        }
    });
}

startBot();
