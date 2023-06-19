// routes/home.js
const express = require("express");
const router = express.Router();

const { getAllVideos } = require("../controllers/homeController");

router.get("/", getAllVideos);

module.exports = router;
