import mongoose from "mongoose";

const connect = async () => {
  const res = await mongoose.connect(process.env.MONGO_URI as string);
  console.log(`Mongo DB Connected`, res.connection.host);
};

export default connect;
