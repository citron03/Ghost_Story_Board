import { Box, Text } from "@chakra-ui/react";
import { Comment } from "@/types/postType";

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Box
      border="1px"
      borderColor="#000"
      borderRadius="md"
      boxShadow="md"
      padding="2.5"
      margin="1"
      width="50vw"
    >
      <Text fontSize="xs">작성자: {comment.writer}</Text>
      <Text>{comment.content}</Text>
    </Box>
  );
}
