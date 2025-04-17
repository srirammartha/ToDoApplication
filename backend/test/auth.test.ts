import request from "supertest";
import express from "express";
import { register } from "../src/controllers/auth.controller";

const app = express();
app.use(express.json());
app.post("/api/auth/register", register);

describe("Auth Registration", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "testpass" });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User registered");
  });
});
