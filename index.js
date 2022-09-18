const express = require("express");
const connectDB = require("./config/db");
const router = require("./rotues");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(router);

const server = require("http").createServer(app);

connectDB();

server.listen(port, () => {
  console.log(`server connected on port ${port}`);
});
