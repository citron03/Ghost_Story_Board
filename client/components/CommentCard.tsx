import { Box, Text } from "@chakra-ui/react";
import { Comment } from "@/types/postType";

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Box border="AppWorkspace">
      <Text>{comment.content}</Text>
      <Text>{comment.writer}</Text>
    </Box>
  );
}
