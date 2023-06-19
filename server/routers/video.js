// routes/video.js
const express = require("express");
const router = express.Router();

const { getVideo } = require("../controllers/videoController");

router.get("/", getVideo);

module.exports = router;
