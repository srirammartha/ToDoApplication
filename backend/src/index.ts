import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import "./types/express";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

AppDataSource.initialize().then(() => {
  app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );
});
