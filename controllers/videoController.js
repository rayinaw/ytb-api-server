const Video = require("../models/video");
const History = require("../models/history");

const getVideo = async (req, res) => {
  const videoId = req.query.videoId;

  try {
    let video = await Video.findOne({ videoId });

    if (!video) {
      const videoData = await getVideoFromAPI(videoId);

      if (videoData) {
        video = await Video.create(videoData);
      }
    }

    const { username } = req.user;
    await History.create({ username, videoId });

    res.json(video);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getVideo,
};
