require("dotenv").config();
const express = require("express");
const cors = require("cors");

const newsRoutes = require("./router/news.routes");
const videosRoutes = require("./router/videos.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Truman Show Backend rodando");
});

app.use("/news", newsRoutes);
app.use("/videos", videosRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🔥 Server rodando na porta ${PORT}`);
});
