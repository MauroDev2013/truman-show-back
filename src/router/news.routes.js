const express = require("express");
const router = express.Router();
const { sendNewsEmail } = require("../services/mail.service");

router.post("/", async (req, res) => {
  try {
    const { theory, mainFlag, secondaryFlags } = req.body;

    if (!theory || !mainFlag) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    await sendNewsEmail({
      theory,
      mainFlag,
      secondaryFlags,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao enviar email" });
  }
});

module.exports = router;
