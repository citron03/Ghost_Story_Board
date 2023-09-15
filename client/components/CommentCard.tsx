import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { Comment } from "@/types/postType";
import { DeleteTitle } from "@/types";
import CommentUpdateModal from "./CommentUpdateModal";

interface IcommentCard {
  comment: Comment;
  onDeleteCommentModal: (id: string, title: DeleteTitle) => void;
  refetch: () => void;
}

export default function CommentCard({
  comment,
  onDeleteCommentModal,
  refetch,
}: IcommentCard) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Box margin="1.5">
        <Button
          onClick={() => onDeleteCommentModal(comment.id, "댓글")}
          size="xs"
          marginRight="0.5"
          backgroundColor="red.200"
        >
          삭제
        </Button>
        <Button onClick={onOpen} size="xs" backgroundColor="yellow.200">
          수정
        </Button>
      </Box>
      {isOpen && (
        <CommentUpdateModal
          isOpen={isOpen}
          onClose={onClose}
          commentData={comment}
          refetch={refetch}
        />
      )}
    </Box>
  );
}
