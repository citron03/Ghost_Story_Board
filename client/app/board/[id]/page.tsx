"use client";
import { useParams } from "next/navigation";
import { Box, Stack, Text } from "@chakra-ui/react";

import { useGetPostById } from "@/hooks/apis/get";
import { Post } from "@/types/postType";
import TagCard from "@/components/TagCard";
import CommentCard from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";

export default function Page() {
  const { id } = useParams();
  const { data } = useGetPostById(id);
  const postData: Post | undefined = data?.data[0];

  return (
    <>
      <Stack alignItems="center" margin="4" backgroundColor="whiteAlpha.300">
        <Text> 게시글 제목 {postData?.title}</Text>
        <Box>
          {postData?.tags.map((tag) => (
            <TagCard key={tag.id} name={tag.name} />
          ))}
        </Box>
        <Box>
          <Text>{postData?.writer}</Text>
          <Text>{postData?.views}</Text>
        </Box>
        <Text>{postData?.content}</Text>
        <Stack
          display="flex"
          alignItems="center"
          borderTop="1px"
          width="full"
          backgroundColor="yellow.50"
        >
          {postData?.comments && postData?.comments?.length > 0 ? (
            postData.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          ) : (
            <Text>댓글이 없습니다.</Text>
          )}
          <CommentForm postId={id} />
        </Stack>
      </Stack>
    </>
  );
}
