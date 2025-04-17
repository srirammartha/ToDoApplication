import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../Entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);
  const { username, password } = req.body;

  const existing = await userRepo.findOne({ where: { username } });
  if (existing) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = userRepo.create({ username, password: hashed });
  await userRepo.save(user);

  res.status(201).json({ message: "User registered" });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);
  const { username, password } = req.body;

  const user = await userRepo.findOne({ where: { username } });
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!
  );
  res.json({ token });
};
