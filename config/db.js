const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB Connected`, res.connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
