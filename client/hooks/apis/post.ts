import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/api";
import { Post } from "@/types/postType";
import useSafeMount from "../useSafeMount";

interface DataPosts {
  message: string;
  data: Post[];
}

export const useGetAllPosts = () => {
  const { data } = useQuery<DataPosts>({
    queryKey: ["all_posts"],
    queryFn: () => axios.get("/board/all").then((res) => res.data),
    suspense: true,
  });
  return { data };
};

export const useGetPostById = (id: string, comment: boolean = true) => {
  const hasMounted = useSafeMount(); // 새로고침 시 무한 fetch 방지 (무한 렌더링)
  const { data } = useQuery<DataPosts>({
    queryKey: ["post", id],
    queryFn: () =>
      axios.get(`/board/post/${id}?comment=${comment}`).then((res) => res.data),
    suspense: true,
    enabled: hasMounted,
    staleTime: 60 * 60 * 24,
  });
  return { data };
};

const putPost = async ({
  postDataId,
  checkPassword,
  body,
}: {
  postDataId: string;
  checkPassword: string;
  body: Partial<Post>;
}) => {
  try {
    const result = await axios.put(
      `/board/post/${postDataId}/${checkPassword}`,
      body
    );
    return result.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const usePutPost = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putPost,
    onSuccess(data, _variables, _context) {
      const result = data as {
        message: string;
        postUpdateResult: Post;
      };
      onClose();
      return queryClient.invalidateQueries([
        "post",
        result.postUpdateResult.id,
      ]);
    },
    onError() {
      alert("에러 발생!\n게시글을 수정하지 못했습니다.");
    },
  });
  return mutation;
};
