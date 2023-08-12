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
      const postRepo = AppDataSource.getRepository(Post);
      const findPost = await postRepo.find({
        relations: {
          tags: true,
          comments: isComment,
        },
        where: { id: Number(id) },
      });
      if (findPost) {
        // 조회수 증가
        findPost[0].views += 1;
        const responsePost = await postRepo.save(findPost);
        logger.info(`성공! id가 ${id}인 게시물을 반환합니다.`, responsePost);
        res.status(200).json({
          message: `성공! id가 ${id}인 게시물을 반환합니다.`,
          data: responsePost,
        });
      } else {
        throw new Error("해당 게시물이 존재하지 않습니다.");
      }
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

boardRouter.put(
  "/comment/:commentId/:password",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.commentId || !req.params.password) {
        res.status(404).json({ message: "Not Enough Comment Update Data" });
      } else {
        const commentRepo = AppDataSource.getRepository(Comment);
        const findComment = await commentRepo.findOne({
          where: {
            id: Number(req.params.commentId),
          },
          relations: {
            post: true, // Post 데이터 포함
          },
        });
        if (!findComment) {
          res.status(404).json({ message: "This comment does not exist!" });
        } else if (findComment.password !== req.params.password) {
          // 수정 비밀번호 불일치
          res.status(400).json({ message: "worng comment password" });
        } else {
          commentRepo.merge(findComment, req.body);
          const commentUpdateResult = await commentRepo.save(findComment);
          if (commentUpdateResult) {
            logger.info("댓글 수정 성공, ", commentUpdateResult);
            res.status(200).json({
              message: `${commentUpdateResult.id} comment delete SUCCESS!`,
              commentUpdateResult,
            });
          } else {
            res.status(404).json({
              message: `${findComment.id} comment delete fail`,
            });
          }
        }
      }
    } catch (err) {
      next(err);
    }
  }
);

boardRouter.delete(
  "/comment/:commentId/:password",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.commentId || !req.params.password) {
        res.status(404).json({ message: "Not Enough Comment Delete Data" });
      } else {
        const commentRepo = AppDataSource.getRepository(Comment);
        const findComment = await commentRepo.findOne({
          where: {
            id: Number(req.params.commentId),
          },
        });
        if (!findComment) {
          res.status(404).json({ message: "This comment does not exist!" });
        } else if (findComment.password !== req.params.password) {
          // 삭제 비밀번호 불일치
          res.status(400).json({ message: "worng comment password" });
        } else {
          const commentDeleteResult = await commentRepo.remove(findComment);
          if (commentDeleteResult) {
            logger.info("댓글 삭제 성공, ", commentDeleteResult);
            res.status(200).json({
              message: `${commentDeleteResult.id} comment delete SUCCESS!`,
              commentDeleteResult,
            });
          } else {
            res.status(404).json({
              message: `${findComment.id} comment delete fail`,
            });
          }
        }
      }
    } catch (err) {
      next(err);
    }
  }
);

boardRouter.put(
  "/post/:postId/:password",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.postId || !req.params.password) {
        res.status(404).json({ message: "Not Enough Post Update Data" });
      } else {
        const postRepo = AppDataSource.getRepository(Post);
        const findPost = await postRepo.findOne({
          where: { id: Number(req.params.postId) },
          relations: {
            comments: true,
          },
        });
        if (!findPost) {
          res.status(404).json({ message: "This post does not exist!" });
        } else if (findPost.password !== req.params.password) {
          // 수정 비밀번호 불일치
          res.status(400).json({ message: "worng post password" });
        } else {
          // 게시물 수정
          postRepo.merge(findPost, req.body);
          const postUpdateResult = await postRepo.save(findPost);
          if (postUpdateResult) {
            logger.info("게시물 수정 성공, ", postUpdateResult);
            res.status(200).json({
              message: `${postUpdateResult.id} post update SUCCESS!`,
              postUpdateResult,
            });
          } else {
            res.status(404).json({
              message: `${findPost.id} post update fail`,
            });
          }
        }
      }
    } catch (err) {
      next(err);
    }
  }
);
boardRouter.delete(
  "/post/:postId/:password",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.postId || !req.params.password) {
        res.status(404).json({ message: "Not Enough Post Delete Data" });
      } else {
        const postRepo = AppDataSource.getRepository(Post);
        const findPost = await postRepo.findOne({
          where: { id: Number(req.params.postId) },
          relations: {
            comments: true,
          },
        });
        if (!findPost) {
          res.status(404).json({ message: "This post does not exist!" });
        } else if (findPost.password !== req.params.password) {
          // 삭제 비밀번호 불일치
          res.status(400).json({ message: "worng post password" });
        } else {
          // 댓글 삭제
          const commentRepo = AppDataSource.getRepository(Comment);
          const commentDeleteResult = await commentRepo.remove(
            findPost.comments
          );
          if (!commentDeleteResult) {
            return new Error("댓글 삭제 실패!");
          }
          logger.info("댓글 삭제 성공, ", commentDeleteResult);
          // 게시물 삭제
          const postRemoveResult = await postRepo.remove(findPost);
          if (postRemoveResult) {
            logger.info("게시물 삭제 성공, ", postRemoveResult);
            res.status(200).json({
              message: `${postRemoveResult.id} post delete SUCCESS!`,
              postRemoveResult,
            });
          } else {
            res.status(404).json({
              message: `${findPost.id} post delete fail`,
            });
          }
        }
      }
    } catch (err) {
      next(err);
    }
  }
);

export default boardRouter;
