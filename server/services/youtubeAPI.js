const axios = require("axios");
const Video = require("../models/video");
const API_KEY = process.env.API_KEY;
const Redis = require("ioredis");

const redis = new Redis({
  host: 'redis',
  port: 6379,
});


const getVideoFromAPI = async (videoId) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
    );
    // const videoData = response.data;
    // return videoData;
    //console.log(response);
    const videos = response.data.items.map((item) => {
      return {
        videoId: item.id,
        etag: item.etag,
        title: item.snippet.title,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
      };
    });
    return videos;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getHomeVideoFromAPI = async () => {
  try {
    const isUpdating = await redis.get("isUpdating");
    if (isUpdating) {
      console.log("Another server is currently updating the data.");
      return { success: false };
    }
    await redis.set("isUpdating", true);
    console.log("Start updating data...");
    await Video.deleteMany();

    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&key=${API_KEY}`
    );

    const videos = response.data.items.map((item) => {
      return {
        videoId: item.id.videoId,
        etag: item.etag,
        title: item.snippet.title,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishTime,
        thumbnails: item.snippet.thumbnails,
      };
    });

    for (const video of videos) {
      await Video.create(video);
    }

    console.log("Data updated successfully!");
    await redis.del("isUpdating");

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  getVideoFromAPI,
  getHomeVideoFromAPI,
};
