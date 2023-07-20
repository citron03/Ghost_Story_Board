import { Box, Button, Text } from "@chakra-ui/react";
import { Comment } from "@/types/postType";

interface IcommentCard {
  comment: Comment;
  onDeleteCommentModal: (id: string, title: string) => void;
}

export default function CommentCard({
  comment,
  onDeleteCommentModal,
}: IcommentCard) {
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
      <Box>
        <Button
          onClick={() => onDeleteCommentModal(comment.id, "댓글")}
          size="xs"
        >
          삭제
        </Button>
      </Box>
    </Box>
  );
}
