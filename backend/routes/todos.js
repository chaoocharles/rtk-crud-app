import Todo from "../models/todo.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { task, author, isComplete, date, uid } = req.body;

    let todo = new Todo({ task, author, isComplete, date, uid });

    todo = await todo.save();
    res.send(todo);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
