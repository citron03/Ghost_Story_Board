"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@chakra-ui/react";
import dayjs from "dayjs";
import styles from "./PostsList.module.css";

import type { Post } from "../types/postType";
import PostCard from "./PostCard";

interface DataPosts {
  message: string;
  data: Post[];
}

export default function PostsList() {
  const { isLoading, error, data } = useQuery<DataPosts>({
    queryKey: ["all_posts"],
    queryFn: () =>
      axios.get("http://localhost:8080/board/all").then((res) => res.data),
  });

  if (error) {
    return <Box>ERROR!</Box>;
  }
  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.700"
        color="red.500"
        size="xl"
      />
    );
  }
  console.log("data", data);
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
