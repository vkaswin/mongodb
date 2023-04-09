import express from "express";
import dotenv from "dotenv";
import connect from "./src/database/config";
import router from "./src/rotues";
import cors from "./src/middleware/cors";
import person from "./src/models/person";

dotenv.config();

const port = process.env.PORT;
const app = express();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(router)
  .get("/", async (req, res) => {
    await person.updateOne(
      {
        _id: "632835b5d153ed22fe9ba479",
      },
      {}
    );
    res.status(200).send("Success");
  });

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
