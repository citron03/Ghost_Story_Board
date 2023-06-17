import express from "express";
import type { ErrorRequestHandler } from "express";
import { AppDataSource } from "./src/data-source";
import { User } from "./src/entity/User";

// typeorm
AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));

// express
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
