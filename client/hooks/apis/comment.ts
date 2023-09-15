import { Comment, CommentWithPost } from "@/types/postType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/api";

const putComment = async ({
  commentDataId,
  checkPassword,
  body,
}: {
  commentDataId: string;
  checkPassword: string;
  body: Partial<Comment>;
}) => {
  try {
    const result = await axios.put(
      `/board/comment/${commentDataId}/${checkPassword}`,
      body
    );
    return result.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const usePutComment = (onClose: () => void, refetch: () => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putComment,
    onSuccess(data, _variables, _context) {
      const result = data as {
        message: string;
        commentUpdateResult: CommentWithPost;
      };
      onClose();
      refetch();
      queryClient.invalidateQueries([
        "post",
        result.commentUpdateResult.post.id,
      ]);
    },
    onError() {
      alert("에러 발생!\n댓글을 수정하지 못했습니다.");
    },
  });
  return mutation;
};
