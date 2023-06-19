const axios = require("axios");

const infoChannel = async (req, res) => {
  try {
    const channelId = req.query.id;

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,statistics",
          id: channelId,
          maxResults: 20,
          key: process.env.API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const allVideo = async (req, res) => {
  try {
    const channelId = req.query.id;

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          //id: channelId,
          maxResults: 50,
          type: "video",
          order: "date",
          channelId: channelId,
          key: process.env.API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  infoChannel,
  allVideo,
};
