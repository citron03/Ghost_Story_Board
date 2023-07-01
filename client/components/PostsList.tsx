"use client";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@chakra-ui/react";

import type { Post } from "../types/postType";

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
  return <Box>POST LIST</Box>;
}
