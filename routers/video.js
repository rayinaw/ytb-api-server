// routes/video.js
const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../utils/jwtUtils");
router.use(authenticateJWT);

const { getVideo } = require("../controllers/videoController");

router.get("/", getVideo);

module.exports = router;
