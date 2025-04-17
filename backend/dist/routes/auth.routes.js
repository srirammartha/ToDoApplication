"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/register", (req, res) => {
    (0, auth_controller_1.register)(req, res).catch((err) => {
        console.error("Register error:", err);
        res.status(500).json({ message: "Internal server error" });
    });
});
router.post("/login", (req, res) => {
    (0, auth_controller_1.login)(req, res).catch((err) => {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    });
});
exports.default = router;
