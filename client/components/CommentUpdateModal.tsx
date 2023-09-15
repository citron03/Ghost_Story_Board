import { ChangeEvent, useCallback, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import { Comment } from "@/types/postType";
import { usePutComment } from "@/hooks/apis/comment";

export default function CommentUpdateModal({
  isOpen,
  onClose,
  commentData,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  commentData: Comment;
  refetch: () => void;
}) {
  const [commentContent, setCommentContent] = useState(commentData.content);
  const [checkPassword, setCheckPassword] = useState("");
  const mutation = usePutComment(onClose, refetch);

  const onChangeComment = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  }, []);
  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  }, []);

  const onUpdateComment = useCallback(async () => {
    const body: Partial<Comment> = {
      content: commentContent,
    };
    mutation.mutate({ commentDataId: commentData.id, checkPassword, body });
  }, [checkPassword, commentContent, commentData.id, mutation]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>댓글 수정하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>댓글 내용 수정</FormLabel>
              <Textarea
                placeholder="빈 댓글...."
                value={commentContent}
                onChange={onChangeComment}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>비밀번호 입력</FormLabel>
              <Input
                placeholder="댓글 작성시 입력한 비밀번호"
                value={checkPassword}
                onChange={onChangePassword}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onUpdateComment}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
