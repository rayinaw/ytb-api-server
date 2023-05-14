// routes/home.js
const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../utils/jwtUtils");
router.use(authenticateJWT);

const { getAllVideos } = require("../controllers/homeController");

router.get("/", getAllVideos);

module.exports = router;
