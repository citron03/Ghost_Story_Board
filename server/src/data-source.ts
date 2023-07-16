import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, Post, Tag, Comment } from "./entity";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "ghost_story_board",
  synchronize: true,
  logging: true,
  entities: [User, Post, Tag, Comment],
  migrations: [],
  subscribers: [],
});
