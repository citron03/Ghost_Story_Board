"use client";
import { Box } from "@chakra-ui/react";
import styles from "./PostsList.module.css";

import type { Post } from "../types/postType";
import PostCard from "./PostCard";
import { useGetAllPosts } from "@/hooks/apis/post";

export default function PostsList() {
  const { data } = useGetAllPosts();
  return (
    <Box className={styles.container}>
      {data &&
        data.data.map((el: Post) => (
          <PostCard
            key={el.id}
            id={el.id}
            writer={el.writer}
            views={el.views}
            title={el.title}
            content={el.title}
            createdDate={el.createdDate}
            updatedDate={el.updatedDate}
            tags={el.tags}
          />
        ))}
    </Box>
  );
}
