export interface Post {
  content: string;
  createdDate: string;
  id: number;
  password: string;
  title: string;
  updatedDate: string;
  views: number;
  writer: string;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  createdDate: string;
  updatedDate: string;
}
