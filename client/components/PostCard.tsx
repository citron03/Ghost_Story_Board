import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import styles from "./PostCard.module.css";

import type { Post } from "../types/postType";

export default function PostCard({
  id,
  writer,
  views,
  title,
  content,
  createdDate,
  updatedDate,
}: Partial<Post>) {
  return (
    <Card maxW="sm" key={id} className={styles.cardContainer}>
      <CardHeader></CardHeader>
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text color="blue.600" fontSize="2xs">
            {writer} / {views} views
          </Text>
          <Text>{content}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Text fontSize="3xs" className={styles.dateText}>
          작성일
          <br />
          {dayjs(createdDate).toString()}
        </Text>
        <Text fontSize="3xs" className={styles.dateText}>
          수정일
          <br />
          {dayjs(updatedDate).toString()}
        </Text>
      </CardFooter>
    </Card>
  );
}
