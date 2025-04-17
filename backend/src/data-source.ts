import { DataSource } from "typeorm";
import { User } from "./Entities/User";
import { Role } from "./Entities/Role";
import { Todo } from "./Entities/Todo";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Role, Todo],
});
