const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendNewsEmail(data) {
  const { theory, mainFlag, secondaryFlags } = data;

  await resend.emails.send({
    from: "Truman <onboarding@resend.dev>",
    to: [process.env.MAIL_TO],
    subject: "📩 Nova teoria enviada",
    html: `
      <h2>📰 Nova teoria enviada</h2>
      <p><strong>Flag principal:</strong> ${mainFlag}</p>
      <p><strong>Flags secundárias:</strong> ${
        secondaryFlags?.join(", ") || "Nenhuma"
      }</p>
      <p><strong>Teoria:</strong></p>
      <p>${theory}</p>
    `,
  });

  console.log("📩 Email enviado via Resend");
}

module.exports = { sendNewsEmail };
