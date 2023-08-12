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

export const useGetPostById = (id: string, comment: boolean = true) => {
  const { data } = useQuery<DataPosts>({
    queryKey: ["post", id],
    queryFn: () =>
      axios.get(`/board/post/${id}?comment=${comment}`).then((res) => res.data),
    suspense: true,
    // staleTime: 60 * 60 * 24,
  });
  return { data };
};
