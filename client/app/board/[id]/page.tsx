"use client";
import { useParams } from "next/navigation";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useGetPostById } from "@/hooks/apis/get";
import { Post } from "@/types/postType";
import TagCard from "@/components/TagCard";

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
      </Stack>
    </>
  );
}
