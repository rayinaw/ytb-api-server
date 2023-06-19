const History = require("../models/history");

const getAllHistory = async (req, res) => {
  try {
    const { username } = req.user;

    const history = await History.find({ username });

    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllSearchHistory = async (req, res) => {
  try {
    const { username } = req.user;
    const searchHistory = await History.find({
      username,
      searchQuery: { $exists: true },
      videoId: { $exists: false },
    });
    res.json(searchHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllVideoHistory = async (req, res) => {
  try {
    const { username } = req.user;
    const videoHistory = await History.find({
      username,
      searchQuery: { $exists: false },
      videoId: { $exists: true },
    });
    res.json(videoHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAllHistory = async (req, res) => {
  try {
    const { username } = req.user;
    await History.deleteMany({ username });
    res.status(200).json({ message: "Delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteSearchHistory = async (req, res) => {
  try {
    const { username } = req.user;
    await History.deleteMany({ username, searchQuery: { $exists: true } });
    res.status(200).json({ message: "Delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteVideoHistory = async (req, res) => {
  try {
    const { username } = req.user;
    await History.deleteMany({ username, videoId: { $exists: true } });
    res.status(200).json({ message: "Delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllHistory,
  getAllSearchHistory,
  getAllVideoHistory,
  deleteAllHistory,
  deleteSearchHistory,
  deleteVideoHistory,
};
