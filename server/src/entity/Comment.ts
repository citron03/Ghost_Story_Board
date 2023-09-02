import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Post } from "./Post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  content!: string;

  @Column({ charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  writer!: string;

  @Column({ charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  password!: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
