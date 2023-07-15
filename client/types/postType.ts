import { Date } from ".";

export interface Post extends Date {
  content: string;
  id: number;
  password: string;
  title: string;
  views: number;
  writer: string;
  tags: Tag[];
  comments?: Comment[];
}

export interface Tag extends Date {
  id: number;
  name: string;
}

export interface Comment extends Date {
  id: string;
  postId: string;
  content: string;
  writer: string;
  password: string;
}
