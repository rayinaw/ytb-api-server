const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  searchQuery: {
    type: String,
  },
  videoId: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
