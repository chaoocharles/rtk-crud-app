import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todosAdd } from "../features/todosSlice";

const AddTodo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  console.log(todos.status);
  const [todo, setTodo] = useState({
    task: "",
    isComplete: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(todosAdd(todo));

    setTodo({
      task: "",
      isComplete: false,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={todo.task}
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
        />
        <br />
        <br />
        <input
          type="submit"
          value={todos.status === "pending" ? "Submitting" : "Add Task"}
        />
        {todos.status === "rejected" ? <p>{todos.error}</p> : null}
        {todos.status === "success" ? <p>Task Added</p> : null}
      </form>
    </>
  );
};

export default AddTodo;
