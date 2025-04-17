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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../Entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    const { username, password } = req.body;
    const existing = yield userRepo.findOne({ where: { username } });
    if (existing) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    const hashed = yield bcrypt_1.default.hash(password, 10);
    const user = userRepo.create({ username, password: hashed });
    yield userRepo.save(user);
    res.status(201).json({ message: "User registered" });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    const { username, password } = req.body;
    const user = yield userRepo.findOne({ where: { username } });
    if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const isValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
});
exports.login = login;
