const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTeoriaEmail(data) {
  const { title, story, city, state, country } = data;

  await resend.emails.send({
    from: "Truman <onboarding@resend.dev>",
    to: [process.env.MAIL_TO],
    subject: "🌍 Nova história enviada",
    html: `
      <h2>🌍 Nova história para avaliação</h2>

      <p><strong>Título:</strong> ${title}</p>

      <p><strong>Local:</strong><br>
      ${city || "-"} / ${state || "-"} / ${country || "-"}</p>

      <p><strong>Relato:</strong></p>
      <p>${story}</p>
    `,
  });

  console.log("🌍 Email de teoria enviado via Resend");
}

module.exports = { sendTeoriaEmail };
