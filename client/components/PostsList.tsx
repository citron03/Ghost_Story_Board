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
          <Card maxW="sm" key={el.id} className={styles.cardContainer}>
            <CardHeader></CardHeader>
            <CardBody>
              <Stack mt="6" spacing="3">
                <Heading size="md">{el.title}</Heading>
                <Text color="blue.600" fontSize="2xs">
                  {el.writer} / {el.views} views
                </Text>
                <Text>{el.content}</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Text fontSize="3xs" className={styles.dateText}>
                작성일
                <br />
                {dayjs(el.createdDate).toString()}
              </Text>
              <Text fontSize="3xs" className={styles.dateText}>
                수정일
                <br />
                {dayjs(el.updatedDate).toString()}
              </Text>
            </CardFooter>
          </Card>
        ))}
    </Box>
  );
}
