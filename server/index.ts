import express from "express";
import type { ErrorRequestHandler } from "express";

const app = express();

app.use("/static", express.static("static"));

const port = 8080;

app.get("/", (req, res, next) => {
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
