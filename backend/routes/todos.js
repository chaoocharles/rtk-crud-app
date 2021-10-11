import Todo from "../models/todo.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, author, isComplete, date, uid } = req.body;

  let todo = new Todo({ name, author, isComplete, date, uid });

  todo = await todo.save();
  res.send(todo);
});

export default router;
