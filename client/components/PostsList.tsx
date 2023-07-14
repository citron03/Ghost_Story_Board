"use client";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "./PostsList.module.css";

import type { Post } from "../types/postType";
import PostCard from "./PostCard";

interface DataPosts {
  message: string;
  data: Post[];
}

export default function PostsList() {
  const { data } = useQuery<DataPosts>({
    queryKey: ["all_posts"],
    queryFn: () =>
      axios.get("http://127.0.0.1:8080/board/all").then((res) => res.data),
    suspense: true,
  });

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
