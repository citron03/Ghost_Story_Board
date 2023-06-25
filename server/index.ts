import express from "express";
import type { ErrorRequestHandler } from "express";

import testRouter from "./src/router/test";
import { AppDataSource } from "./src/data-source";
import logger from "./src/logger";

// typeorm DB
AppDataSource.initialize()
  .then(async () => {
    console.log("database connect success! ❤");
  })
  .catch((error) => console.log("DB ERROR!", error));

// express
const app = express();

app.use("/static", express.static("static"));
app.use(express.json()); // use body

const port = 8080;

app.use("/test", testRouter);

app.get("/", (req, res, next) => {
  logger.info("서버 정상 작동!");
  res.status(200).json({ message: "server is running...." });
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send(`Something broke !! ${err}`);
};
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`괴담 괴시판 server 👻 listening on port ${port} !!`);
});
