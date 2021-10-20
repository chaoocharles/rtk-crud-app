import Todo from "../models/todo.js";
import express from "express";
import Joi from "joi";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    res.send(todos);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error: " + error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const schema = Joi.object({
      task: Joi.string().min(3).max(300).required(),
      author: Joi.string().min(3),
      uid: Joi.string(),
      isComplete: Joi.boolean(),
      date: Joi.date(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const { task, author, isComplete, date, uid } = req.body;

    let todo = new Todo({ task, author, isComplete, date, uid });

    todo = await todo.save();
    res.send(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).send("Todo not found...");

  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

  res.send(deletedTodo);
});

export default router;
