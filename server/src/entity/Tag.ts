import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  name!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
