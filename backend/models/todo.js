import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true, minlength: 3, maxlength: 200 },
  isComplete: Boolean,
  date: { type: Date, default: new Date() },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
