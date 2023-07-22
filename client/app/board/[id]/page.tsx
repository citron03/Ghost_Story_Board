"use client";
import { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Stack, Text, useDisclosure } from "@chakra-ui/react";

import axios from "@/utils/api";
import { useGetPostById } from "@/hooks/apis/get";
import { Post } from "@/types/postType";
import TagCard from "@/components/TagCard";
import CommentCard from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";
import DeleteModal from "@/components/DeleteModal";
import { AxiosError } from "axios";

export default function Page() {
  const { id } = useParams();
  const { data } = useGetPostById(id);
  const postData: Post | undefined = data?.data[0];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteComment, setDeleteComment] = useState<{
    id: string;
    title: string;
  }>({ id: "", title: "" });
  const [deleteCommentPassword, setDeleteCommentPassword] = useState("");

  const onDeleteCommentModal = useCallback(
    (id: string, title: string) => {
      setDeleteComment({ id, title });
      onOpen();
    },
    [onOpen]
  );
  const confirmDeleteModal = useCallback(async () => {
    console.log(
      `delete comment\ncommentId: ${deleteComment.id} password: ${deleteCommentPassword}`
    );
    if (!deleteComment.id || !deleteCommentPassword) {
      return alert("잘못된 입력입니다!");
    }
    try {
      const deleteCommentResult = await axios.delete(
        `/board/comment/${deleteComment.id}/${deleteCommentPassword}`
      );
      if (deleteCommentResult) {
        onClose();
        return alert("삭제 성공");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 400) {
        window.alert("잘못된 비밀번호입니다!");
      }
      console.error(axiosError);
    }
  }, [deleteComment.id, deleteCommentPassword, onClose]);

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
              <CommentCard
                key={comment.id}
                comment={comment}
                onDeleteCommentModal={onDeleteCommentModal}
              />
            ))
          ) : (
            <Text>댓글이 없습니다.</Text>
          )}
          <CommentForm postId={id} />
        </Stack>
        {isOpen && (
          <DeleteModal
            isOpen={isOpen}
            onClose={onClose}
            callback={confirmDeleteModal}
            title={deleteComment?.title}
            password={deleteCommentPassword}
            setPassword={setDeleteCommentPassword}
          />
        )}
      </Stack>
    </>
  );
}
