const mongoose = require("mongoose");

const connect = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB Connected`, res.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export default connect;
