require("dotenv").config();
const express = require("express");
const cors = require("cors");

const newsRoutes = require("./router/news.routes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rota teste
app.get("/", (req, res) => {
  res.send("🚀 Truman Show Backend rodando");
});

// rotas principais
app.use("/news", newsRoutes);

// porta
const PORT = process.env.PORT || 3001;

// 🚨 ISSO MANTÉM O SERVIDOR VIVO
app.listen(PORT, () => {
  console.log(`🔥 Server rodando na porta ${PORT}`);
});
