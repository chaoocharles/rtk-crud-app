import Todo from "../models/todo.js";
import express from "express";
import Joi from "joi";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const schema = Joi.object({
      task: Joi.string().min(3).max(200).required(),
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

export default router;
