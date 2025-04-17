import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", (req, res) => {
  register(req, res).catch((err) => {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  });
});

router.post("/login", (req, res) => {
  login(req, res).catch((err) => {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  });
});

export default router;
