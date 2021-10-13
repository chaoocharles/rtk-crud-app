import { useState } from "react";
import { useDispatch } from "react-redux";
import { todosAdd } from "../features/todosSlice";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    task: "",
    isComplet: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(todosAdd(todo));

    setTodo({
      task: "",
      isComplet: false,
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
        <input type="submit" value="Add Task" />
      </form>
    </>
  );
};

export default AddTodo;
