require("dotenv").config();

const express = require("express");

const helmet = require("helmet");

const PORT = process.env.PORT;

const connectDB = require("./utils/database");

const { getHomeVideoFromAPI } = require("./services/youtubeAPI");

const app = express();

app.use(helmet());

connectDB();

getHomeVideoFromAPI();

setInterval(() => {
  getHomeVideoFromAPI();
}, 3600000);

app.use("/api/home", require("./routers/home"));
app.use("/api/video", require("./routers/video"));
app.use("/api/search", require("./routers/search"));
app.use("/api/history", require("./routers/history"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
