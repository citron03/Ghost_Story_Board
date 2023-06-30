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

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  writer!: string;

  @Column()
  password!: string;

  @Column()
  views!: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Comment[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
