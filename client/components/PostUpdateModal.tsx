import { useCallback } from "react";
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
import { Post, Tag } from "@/types/postType";
import { usePutPost } from "@/hooks/apis/post";
import useInput from "@/hooks/useInput";

export default function PostUpdateModal({
  isOpen,
  onClose,
  postData,
}: {
  isOpen: boolean;
  onClose: () => void;
  postData: Post;
}) {
  const [postTitle, onChangePostTitle] = useInput<string, HTMLInputElement>(
    postData.title
  );
  const [postContent, onChangePostContent] = useInput<
    string,
    HTMLTextAreaElement
  >(postData.content);
  const [checkPassword, onChangeCheckPassword] = useInput<
    string,
    HTMLInputElement
  >("");
  const mutation = usePutPost(onClose);

  const onUpdatePost = useCallback(async () => {
    const body: Partial<Post> = {
      content: postContent,
    };
    mutation.mutate({ postDataId: String(postData.id), checkPassword, body });
  }, [checkPassword, mutation, postContent, postData.id]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>괴담 수정하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>제목 수정</FormLabel>
              <Input
                placeholder="빈 제목...."
                value={postTitle}
                onChange={onChangePostTitle}
              />
            </FormControl>
            <FormControl>
              <FormLabel>내용 수정</FormLabel>
              <Textarea
                placeholder="빈 내용...."
                value={postContent}
                onChange={onChangePostContent}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>비밀번호 입력</FormLabel>
              <Input
                placeholder="게시글 작성시 입력한 비밀번호"
                value={checkPassword}
                onChange={onChangeCheckPassword}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onUpdatePost}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
