const express = require("express");
const router = express.Router();
const { sendTeoriaEmail } = require("../services/teoriaMail.service");

router.post("/", async (req, res) => {
  try {
    const { title, story } = req.body;

    if (!title || !story) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    await sendTeoriaEmail(req.body);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao enviar email" });
  }
});

module.exports = router;
