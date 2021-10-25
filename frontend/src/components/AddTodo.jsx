import { useDispatch, useSelector } from "react-redux";
import { todosAdd, updateTodo } from "../features/todosSlice";

const AddTodo = ({ todo, setTodo }) => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todosState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo._id) {
      dispatch(updateTodo(todo));
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };

      dispatch(todosAdd(newTodo));
    }

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
          value={
            todosState.status === "pending"
              ? "Submitting"
              : todo._id
              ? "Update Task"
              : "Add Task"
          }
        />
        {todosState.status === "rejected" ? <p>{todosState.error}</p> : null}
        {todosState.status === "success" ? <p>Task Submitted</p> : null}
      </form>
    </>
  );
};

export default AddTodo;
