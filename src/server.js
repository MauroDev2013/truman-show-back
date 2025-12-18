require("dotenv").config();
const express = require("express");
const cors = require("cors");

const newsRoutes = require("./router/news.routes");
const videosRoutes = require("./router/videos.routes");
const teoriasRoutes = require("./router/teorias.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Truman Show Backend rodando");
});

app.use("/news", newsRoutes);
app.use("/videos", videosRoutes);
app.use("/teorias", teoriasRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🔥 Server rodando na porta ${PORT}`);
});
