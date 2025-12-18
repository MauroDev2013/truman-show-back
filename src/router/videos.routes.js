const express = require("express");
const router = express.Router();
const { sendVideoEmail } = require("../services/videoMail.service");

router.post("/", async (req, res) => {
  try {
    const { theory, mainFlag, secondaryFlags, videoUrl } = req.body;

    if (!theory || !mainFlag || !videoUrl) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    await sendVideoEmail({
      theory,
      mainFlag,
      secondaryFlags,
      videoUrl,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao enviar email" });
  }
});

module.exports = router;
