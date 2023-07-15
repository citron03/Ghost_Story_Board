import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  Text,
  HStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import styles from "./PostCard.module.css";

import type { Post } from "../types/postType";
import TagCard from "./TagCard";
import { useCallback } from "react";

export default function PostCard({
  id,
  writer,
  views,
  title,
  content,
  createdDate,
  updatedDate,
  tags,
}: Partial<Post>) {
  const router = useRouter();
  const handleRoute = useCallback(() => {
    router.push(`/board/${id}`);
  }, [id, router]);
  return (
    <Card
      maxW="sm"
      key={id}
      className={styles.cardContainer}
      onClick={handleRoute}
    >
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <HStack spacing={4}>
          {tags?.map((tag) => (
            <TagCard key={tag.id} name={tag.name} />
          ))}
        </HStack>
        <Stack mt="3" spacing="3">
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
