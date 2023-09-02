import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Comment } from "./Comment";
import { Tag } from "./Tag";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  title!: string;

  @Column({ charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  content!: string;

  @Column({ charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  writer!: string;

  @Column({ charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  password!: string;

  @Column({ default: 0 })
  views!: number;

  // cascade: true 설정 시 Post 삭제 시 자동으로 Comments들 삭제
  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments!: Comment[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
