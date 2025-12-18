const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVideoEmail(data) {
  const { theory, mainFlag, secondaryFlags, videoUrl } = data;

  await resend.emails.send({
    from: "Truman <onboarding@resend.dev>",
    to: [process.env.MAIL_TO],
    subject: "🎬 Novo vídeo enviado",
    html: `
      <h2>🎬 Novo vídeo enviado</h2>

      <p><strong>Flag principal:</strong> ${mainFlag}</p>

      <p><strong>Flags secundárias:</strong> ${
        secondaryFlags?.join(", ") || "Nenhuma"
      }</p>

      <p><strong>Link do vídeo:</strong></p>
      <a href="${videoUrl}" target="_blank">${videoUrl}</a>

      <p><strong>Teoria / descrição:</strong></p>
      <p>${theory}</p>
    `,
  });

  console.log("🎬 Email de vídeo enviado via Resend");
}

module.exports = { sendVideoEmail };
