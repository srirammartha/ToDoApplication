import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./Entities/User";
import { Todo } from "./Entities/Todo";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Todo],
  migrations: [],
  subscribers: [],
});
