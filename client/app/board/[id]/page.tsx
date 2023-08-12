"use client";
import { useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";

import axios from "@/utils/api";
import { AxiosError } from "axios";
import { useGetPostById } from "@/hooks/apis/post";
import { DeleteTitle } from "@/types";
import { Post } from "@/types/postType";
import TagCard from "@/components/TagCard";
import CommentCard from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";
import DeleteModal from "@/components/DeleteModal";

export default function Page() {
  const { id } = useParams();
  const { data } = useGetPostById(id);
  const postData: Post | undefined = data?.data[0];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteData, setDeleteData] = useState<{
    id: string; // commentId
    title: DeleteTitle;
  }>({ id: "", title: "" });
  const [deletePassword, setDeletePassword] = useState("");
  const router = useRouter();

  const onDeleteModal = useCallback(
    (id: string, title: DeleteTitle) => {
      setDeleteData({ id, title });
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(async () => {
    if (!deleteData.id || !deletePassword) {
      return alert("잘못된 입력입니다!");
    }
    try {
      const typeOfDelete = deleteData.title === "댓글" ? "comment" : "post";
      const deleteResult = await axios.delete(
        `/board/${typeOfDelete}/${deleteData.id}/${deletePassword}`
      );
      if (deleteResult) {
        onClose();
        if (deleteData.title === "게시물") {
          router.push("/");
        } else {
          return alert("댓글 삭제 성공");
        }
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 400) {
        window.alert("잘못된 비밀번호입니다!");
      }
      console.error(axiosError);
    } finally {
      setDeletePassword("");
    }
  }, [deleteData.id, deleteData.title, deletePassword, onClose, router]);

  return (
    <>
      <Stack alignItems="center" margin="4" backgroundColor="whiteAlpha.300">
        <Text> 게시글 제목 {postData?.title}</Text>
        <Box
          width="container.md"
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
        >
          <Text>조회수 {postData?.views}</Text>
          <Text>작성자 {postData?.writer}</Text>
          <Button
            size="xs"
            backgroundColor="teal.200"
            onClick={() => {
              if (!postData?.id) {
                return alert("잘못된 요청입니다.");
              }
              onDeleteModal(id, "게시물"); // postId
            }}
          >
            게시물 삭제
          </Button>
        </Box>
        <Box>
          {postData?.tags.map((tag) => (
            <TagCard key={tag.id} name={tag.name} />
          ))}
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
                onDeleteCommentModal={onDeleteModal}
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
            callback={onDelete}
            title={deleteData?.title}
            password={deletePassword}
            setPassword={setDeletePassword}
          />
        )}
      </Stack>
    </>
  );
}
