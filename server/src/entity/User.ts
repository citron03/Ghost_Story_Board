import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// sample example
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  firstName!: string;

  @Column({ charset: "utf8mb4", collation: "utf8mb4_unicode_ci" })
  lastName!: string;

  @Column()
  age!: number;
}
