// routes/channel.js
const express = require("express");
const router = express.Router();

const channelController = require("../controllers/channelController");

router.get("/info", channelController.infoChannel);
router.get("/video", channelController.allVideo);

module.exports = router;
