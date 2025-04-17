import { Router, Request, Response, NextFunction } from "express";
import { getTodos, createTodo } from "../controllers/todo.controller";
import { authenticate } from "../middleware/auth.middleware";

const router: Router = Router();

router.use(authenticate);
router.get("/", getTodos);
router.post("/", createTodo);

export default router;
