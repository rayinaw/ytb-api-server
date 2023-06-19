// utils/databse.js
const mongoose = require("mongoose");
const MONGODB_PASS = process.env.MONGODB_PASS;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://21522618:${MONGODB_PASS}@clusters.yk8pgog.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
