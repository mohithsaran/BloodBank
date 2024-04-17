const mongoose = require("mongoose");
MONGO_URL="mongodb://localhost:27017/bloodbank"

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(`Mongodb Database Error ${error}`);
  }
};

module.exports = connectDB;