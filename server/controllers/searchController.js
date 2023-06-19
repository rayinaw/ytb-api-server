const axios = require("axios");

const History = require("../models/history");

const searchVideos = async (req, res) => {
  try {
    const searchQuery = req.query.q;

    const { username } = req.user;

    await History.create({ username, searchQuery });

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: searchQuery,
          type: "video",
          maxResults: 20,
          key: process.env.API_KEY,
        },
      }
    );

    const videos = response.data.items.map((item) => {
      return {
        videoId: item.id.videoId,
        etag: item.etag,
        snippet: item.snippet,
      };
    });

    res.json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  searchVideos,
};
