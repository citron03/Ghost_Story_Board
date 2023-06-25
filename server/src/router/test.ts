import { Router } from "express";
import { Post, Comment, Tag } from "../entity";
import { AppDataSource } from "../data-source";
import logger from "../logger";

const testRouter = Router();

testRouter.get("/post", async (req, res, next) => {
  // tag
  const tagNames = ["Testing...", "MULTIPLE!"];
  let dbTags = [];
  // forEach 내부에서는 async await을 사용할 수 없다.
  for (let tag of tagNames) {
    const checkTag = await AppDataSource.getRepository(Tag).findOne({
      where: {
        name: tag,
      },
    });
    if (!checkTag) {
      const newTag = new Tag();
      newTag.name = tag;
      const result = await AppDataSource.manager.save(newTag);
      dbTags.push(result);
    } else {
      dbTags.push(checkTag);
    }
  }
  // post
  const post = new Post();
  post.title = "테스트 포스팅";
  post.content = "글 내용입니다.";
  post.writer = "작성자1";
  post.password = "0000";
  post.tags = dbTags;
  try {
    const result = await AppDataSource.manager.save(post);
    res.status(200).json({ message: `${result.id} 글 작성 성공!`, result });
    logger.info(result);
  } catch (err) {
    next(err);
  }
});

// comment
testRouter.get("/comment", async (req, res, next) => {
  const post = await AppDataSource.getRepository(Post).findOne({
    where: {
      id: 1,
    },
  });
  if (!post) {
    res.status(404).json({ message: "404 NOT FOIND" });
  } else {
    const comment1 = new Comment();
    comment1.content = "안녕, 테스트 작성 글이야.\n 만나서 반가위!";
    comment1.writer = "테스터";
    comment1.password = "0000";
    comment1.post = post;
    const result = await AppDataSource.manager.save(comment1);
    res.status(201).json({ message: "SUCCESS COMMENTING!", result });
    logger.info(result);
  }
});

export default testRouter;
