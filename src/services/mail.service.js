const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendNewsEmail(data) {
  const { theory, mainFlag, secondaryFlags } = data;

  const html = `
    <h2>📰 Nova teoria enviada</h2>
    <p><strong>Flag principal:</strong> ${mainFlag}</p>
    <p><strong>Flags secundárias:</strong> ${
      secondaryFlags?.join(", ") || "Nenhuma"
    }</p>
    <p><strong>Teoria:</strong></p>
    <p>${theory}</p>
  `;

  await transporter.sendMail({
    from: `"Truman" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    subject: "📩 Nova teoria enviada",
    html,
  });
}

module.exports = { sendNewsEmail };
