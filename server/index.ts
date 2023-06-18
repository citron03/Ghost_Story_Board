import express from "express";
import type { ErrorRequestHandler } from "express";

import { AppDataSource } from "./src/data-source";
import { User, Post } from "./src/entity";

import logger from "./src/logger";

// typeorm DB
AppDataSource.initialize()
  .then(async () => {
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await AppDataSource.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await AppDataSource.manager.find(User);
    // console.log("Loaded users: ", users);

    // express
    const app = express();

    app.use("/static", express.static("static"));

    const port = 8080;

    app.get("/", (req, res, next) => {
      logger.info("서버 정상 작동!");
      res.status(200).json({ message: "server is running...." });
    });

    app.get("/test/post", async (req, res, next) => {
      const post = new Post();
      post.title = "테스트 포스팅";
      post.content = "글 내용입니다.";
      post.writer = "작성자1";
      try {
        const result = await AppDataSource.manager.save(post);
        res.status(200).json({ message: `${result.id} 글 작성 성공!` });
      } catch (err) {
        next(err);
      }
    });

    const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
      console.error(err.stack);
      res.status(500).send(`Something broke !! ${err}`);
    };
    app.use(errorHandler);

    app.listen(port, "0.0.0.0", () => {
      console.log(`괴담 괴시판 server 👻 listening on port ${port} !!`);
    });
  })
  .catch((error) => console.log(error));
