require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

/* ===============================
   SOCKET.IO
================================ */
const io = new Server(server, {
  cors: {
    origin: "*", // permite celular, pc, qualquer origem
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🔥 Truman Show Chat rodando");
});

/* ===============================
   ESTADO DO CHAT (MEMÓRIA)
================================ */
let messages = [];
const muted = new Set();
const banned = new Set();

const ADMIN_KEY = process.env.ADMIN_KEY || "TRUMAN_OWNER_001";

/* ===============================
   SOCKET EVENTS
================================ */
io.on("connection", (socket) => {
  console.log("🟢 Conectado:", socket.id);

  // usuário padrão
  socket.role = "guest";
  socket.username = `Guest-${socket.id.slice(0, 4)}`;

  // envia mensagens existentes
  socket.emit("chat:init", messages);

  /* ---------- ADMIN ---------- */
  socket.on("auth", (key) => {
    if (key === ADMIN_KEY) {
      socket.role = "owner";
      socket.username = "👑 The Architect";
      socket.emit("auth:success");
    }
  });

  /* ---------- MENSAGEM ---------- */
  socket.on("chat:send", (text) => {
    if (!text || typeof text !== "string") return;
    if (text.length > 300) return;
    if (muted.has(socket.id)) return;
    if (banned.has(socket.id)) return;

    const msg = {
      id: Date.now(),
      user: socket.username,
      role: socket.role,
      content: text.replace(/<[^>]*>/g, ""), // bloqueia HTML
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      socketId: socket.id,
    };

    messages.push(msg);
    io.emit("chat:new", msg);
  });

  /* ---------- MUTE ---------- */
  socket.on("chat:mute", (targetId) => {
    if (socket.role !== "owner") return;
    muted.add(targetId);
  });

  /* ---------- BAN ---------- */
  socket.on("chat:ban", (targetId) => {
    if (socket.role !== "owner") return;
    banned.add(targetId);
    io.to(targetId).emit("chat:banned");
  });

  socket.on("disconnect", () => {
    console.log("🔴 Saiu:", socket.id);
  });
});

/* ===============================
   LIMPAR À MEIA-NOITE
================================ */
function clearAtMidnight() {
  const now = new Date();
  const next = new Date();
  next.setHours(24, 0, 0, 0);

  setTimeout(() => {
    messages = [];
    muted.clear();
    banned.clear();
    io.emit("chat:cleared");
    clearAtMidnight();
  }, next - now);
}

clearAtMidnight();

/* ===============================
   START SERVER
================================ */
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
