"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = exports.getTodos = void 0;
const data_source_1 = require("../data-source");
const Todo_1 = require("../Entities/Todo");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepo = data_source_1.AppDataSource.getRepository(Todo_1.Todo);
    const todos = yield todoRepo.find({
        where: { user: { id: req.user.id } },
    });
    res.json(todos);
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const todoRepo = data_source_1.AppDataSource.getRepository(Todo_1.Todo);
    const todo = todoRepo.create({
        title,
        description,
        user: { id: req.user.id },
    });
    yield todoRepo.save(todo);
    res.status(201).json(todo);
});
exports.createTodo = createTodo;
