const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  etag: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  channelTitle: {
    type: String,
    required: true,
  },
  publishTime: {
    type: Date,
    required: true,
  },
  thumbnails: {
    default: {
      url: {
        type: String,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
    },
    medium: {
      url: {
        type: String,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
    },
    high: {
      url: {
        type: String,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
    },
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
