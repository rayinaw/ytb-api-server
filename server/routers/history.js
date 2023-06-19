// routes/history.js
const express = require("express");
const router = express.Router();

const historyController = require("../controllers/historyController");

router.get("/all", historyController.getAllHistory);

router.get("/search", historyController.getAllSearchHistory);

router.get("/video", historyController.getAllVideoHistory);

router.delete("/all", historyController.deleteAllHistory);

router.delete("/search", historyController.deleteSearchHistory);

router.delete("/video", historyController.deleteVideoHistory);

module.exports = router;
