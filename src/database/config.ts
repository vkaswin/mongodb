const mongoose = require("mongoose");

const connect = async () => {
  const res = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Mongo DB Connected`, res.connection.host);
};

export default connect;
