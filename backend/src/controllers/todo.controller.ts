import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Todo } from "../Entities/Todo";

interface AuthRequest extends Request {
  user?: any;
}

export const getTodos = async (req: AuthRequest, res: Response) => {
  const todoRepo = AppDataSource.getRepository(Todo);
  const todos = await todoRepo.find({
    where: { user: { id: req.user.id } },
  });
  res.json(todos);
};

export const createTodo = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const todoRepo = AppDataSource.getRepository(Todo);
  const todo = todoRepo.create({
    title,
    description,
    user: { id: req.user.id },
  });
  await todoRepo.save(todo);
  res.status(201).json(todo);
};
