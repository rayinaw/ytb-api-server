// routes/search.js
const express = require("express");
const router = express.Router();

const { searchVideos } = require("../controllers/searchController");

router.get("/", searchVideos);

module.exports = router;
