import fs from 'fs';

const gam = new Map(); // Mapa para almacenar las trivias activas

function cargarPreguntas() {
  try {
    const data = fs.readFileSync('./src/game/trivia.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error cargando preguntas de trivia:", error);
    return [];
  }
}

function elegirPreguntaAleatoria(preguntas) {
  return preguntas[Math.floor(Math.random() * preguntas.length)];
}

let handler = async (m, { conn }) => {
  if (gam.has(m.sender)) {
    return conn.reply(m.chat, "⚠️ Ya tienes una trivia en curso. ¡Responde antes de iniciar otra!", m);
  }

  let preguntas = cargarPreguntas();
  if (preguntas.length === 0) {
    return conn.reply(m.chat, "⚠️ No hay preguntas disponibles en este momento.", m);
  }

  let pregunta = elegirPreguntaAleatoria(preguntas);
  let tiempoExpira = setTimeout(() => {
    if (gam.has(m.sender)) {
      let juego = gam.get(m.sender);
      conn.reply(m.chat, `⏳ ¡Tiempo agotado! La respuesta correcta era *${juego.pregunta.respuestaCorrecta.toUpperCase()}*`, m);
      gam.delete(m.sender);
    }
  }, 60000); // 1 minuto

  gam.set(m.sender, { pregunta, tiempoExpira });

  let mensaje = `🎲 *Trivia - Juanca-Bot*\n\n*${pregunta.pregunta}*\n\n`;
  for (const [key, value] of Object.entries(pregunta.opciones)) {
    mensaje += `*${key.toUpperCase()}.* ${value}\n`;
  }
  mensaje += `\n📌 *Responde con A, B o C en 1 minuto.*`;

  conn.reply(m.chat, mensaje, m);
};

handler.before = async (m, { conn }) => {
  let juego = gam.get(m.sender);
  if (!juego) return;

  let respuestaUsuario = m.text.toLowerCase().trim();
  
  if (!["a", "b", "c"].includes(respuestaUsuario)) return; // Solo permite A, B o C

  let { pregunta, tiempoExpira } = juego;
  let respuestaCorrecta = pregunta.respuestaCorrecta;

  clearTimeout(tiempoExpira); // Cancela el temporizador si responde a tiempo
  gam.delete(m.sender);

  if (respuestaUsuario === respuestaCorrecta) {
    let expGanada = Math.floor(Math.random() * 7000) + 3000; // XP entre 3000 y 10000
    global.db.data.users[m.sender].exp += expGanada;

    return conn.reply(m.chat, `🎉 ¡Correcto! ✅ La respuesta era *${respuestaCorrecta.toUpperCase()}*\n\n✨ *Has ganado +${expGanada} XP* ⚡`, m);
  } else {
    return conn.reply(m.chat, `❌ Incorrecto. La respuesta correcta era *${respuestaCorrecta.toUpperCase()}*`, m);
  }
};

handler.command = /^trivia$/i;
handler.tags = ['fun'];
handler.help = ['trivia'];
handler.group = true;

export default handler;
