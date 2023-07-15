import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { Post, Comment, Tag } from "../entity";
import { AppDataSource } from "../data-source";
import logger from "../logger";

const boardRouter = Router();

boardRouter.get(
  "/all",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allPost = await AppDataSource.getRepository(Post).find({
        relations: {
          tags: true,
        },
      });
      console.log("allPost", allPost);
      logger.info("성공! 모든 게시물을 반환합니다.", allPost);
      res
        .status(200)
        .json({ message: "성공! 모든 게시물을 반환합니다.", data: allPost });
    } catch (err) {
      next(err);
    }
  }
);

boardRouter.get(
  "/post/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let isComment = false;
    if (req.query.comment && req.query.comment === "true") {
      isComment = true;
    }
    if (!id) {
      throw new Error("No Id !!");
    }
    try {
      const findPost = await AppDataSource.getRepository(Post).find({
        relations: {
          tags: true,
          comments: isComment,
        },
        where: { id: Number(id) },
      });
      console.log("findPost", findPost);
      logger.info(`성공! id가 ${id}인 게시물을 반환합니다.`, findPost);
      res.status(200).json({
        message: `성공! id가 ${id}인 게시물을 반환합니다.`,
        data: findPost,
      });
    } catch (err) {
      next(err);
    }
  }
);

boardRouter.post(
  "/post",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    if (
      !req.body.title ||
      !req.body.content ||
      !req.body.writer ||
      !req.body.password
    ) {
      res.status(400).json({ message: "wrong request. check requset body" });
    } else {
      const newPost = new Post();
      newPost.title = req.body.title;
      newPost.content = req.body.content;
      newPost.writer = req.body.writer;
      newPost.password = req.body.password;
      newPost.views = 0;
      if (req.body.tags && req.body.tags.length > 0) {
        let postTags = [];
        for (let tag of req.body.tags) {
          const checkTag = await AppDataSource.getRepository(Tag).findOne({
            where: {
              name: tag,
            },
          });
          if (!checkTag) {
            const newTag = new Tag();
            newTag.name = tag;
            const result = await AppDataSource.manager.save(newTag);
            postTags.push(result);
          } else {
            postTags.push(checkTag);
          }
        }
        newPost.tags = postTags;
      }
      try {
        const postResult = await AppDataSource.manager.save(newPost);
        logger.info("글 작성 성공, ", postResult);
        res
          .status(200)
          .json({ message: `${postResult.id} post save SUCCESS!`, postResult });
      } catch (err) {
        next(err);
      }
    }
  }
);

boardRouter.post(
  "/comment",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req.body", req.body);
      if (
        !req.body.postId ||
        !req.body.content ||
        !req.body.writer ||
        !req.body.password
      ) {
        res.status(400).json({ message: "wrong request. check requset body" });
      } else {
        const findPost = await AppDataSource.getRepository(Post).find({
          relations: {
            tags: false,
            comments: false,
          },
          where: { id: Number(req.body.postId) },
        });
        if (!findPost) {
          res.status(400).json({ message: "This post does not exist!" });
        } else {
          const newComment = new Comment();
          newComment.content = req.body.content;
          newComment.writer = req.body.writer;
          newComment.password = req.body.password;
          newComment.post = findPost[0];
          const commentResult = await AppDataSource.manager.save(newComment);
          logger.info("댓글 작성 성공, ", commentResult);
          res.status(200).json({
            message: `${commentResult.id} comment save SUCCESS!`,
            commentResult,
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }
);

export default boardRouter;
