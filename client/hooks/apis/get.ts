import { useQuery } from "@tanstack/react-query";
import axios from "@/utils/api";
import { Post } from "@/types/postType";

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

export const useGetPostById = (id: string) => {
  const { data } = useQuery<DataPosts>({
    queryKey: [`${id}_post`],
    queryFn: () => axios.get(`/board/post/${id}`).then((res) => res.data),
    suspense: true,
  });
  return { data };
};
