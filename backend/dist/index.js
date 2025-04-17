"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
//import "./types/express";
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/todos", todo_routes_1.default);
data_source_1.AppDataSource.initialize().then(() => {
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
