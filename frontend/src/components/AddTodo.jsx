import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todosAdd } from "../features/todosSlice";

const AddTodo = () => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todosState);
  const [todo, setTodo] = useState({
    task: "",
    isComplete: false,
    date: new Date(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(todosAdd(todo));

    setTodo({
      task: "",
      isComplete: false,
      date: new Date(),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={todo.task}
          onChange={(e) =>
            setTodo({ ...todo, task: e.target.value, date: new Date() })
          }
        />
        <br />
        <br />
        <input
          type="submit"
          value={todosState.status === "pending" ? "Submitting" : "Add Task"}
        />
        {todosState.status === "rejected" ? <p>{todosState.error}</p> : null}
        {todosState.status === "success" ? <p>Task Added</p> : null}
      </form>
    </>
  );
};

export default AddTodo;
