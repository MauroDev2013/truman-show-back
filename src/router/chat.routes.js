const express = require("express");
const router = express.Router();

/*
  Chat em memória (simples e suficiente pro seu caso)
  Se reiniciar o servidor, limpa também.
*/
let messages = [];

/* GET - pegar mensagens */
router.get("/", (req, res) => {
  res.json(messages);
});

/* POST - enviar mensagem */
router.post("/", (req, res) => {
  const { user, role, content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Mensagem vazia" });
  }

  const newMessage = {
    id: Date.now(),
    user,
    role, // "owner" | "guest"
    content,
    createdAt: new Date(),
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
});

/* FUNÇÃO DE LIMPEZA (usada pelo cron) */
function clearChat() {
  messages = [];
  console.log("🧹 Chat limpo");
}

/* DELETE manual (se quiser no futuro) */
router.delete("/clear", (req, res) => {
  clearChat();
  res.json({ ok: true });
});

module.exports = {
  router,
  clearChat,
};
