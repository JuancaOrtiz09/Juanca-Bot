module.exports = {
    name: 'ping',
    description: 'Responde con pong',
    execute: async (sock, msg) => {
        await sock.sendMessage(msg.key.remoteJid, { text: 'pong' });
    }
};
