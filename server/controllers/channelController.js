const axios = require("axios");

const infoChannel = async (req, res) => {
  try {
    const channelId = req.query.id;

    const { username } = req.user;

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics",
      {
        params: {
          part: "snippet,statistics",
          channelId: channelId,
          maxResults: 20,
          key: process.env.API_KEY,
        },
      }
    );

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const allVideo = async (req, res) => {
  try {
    const channelId = req.query.id;

    const { username } = req.user;

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics",
      {
        params: {
          part: "snippet,statistics",
          //id: channelId,
          maxResults: 50,
          type: "video",
          order: "date",
          channelId: channelId,
          key: process.env.API_KEY,
        },
      }
    );

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  infoChannel,
  allVideo,
};
