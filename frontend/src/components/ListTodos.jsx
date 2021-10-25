import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteTodo, getTodos } from "../features/todosSlice";
import moment from "moment";

const ListTodos = ({ setTodo }) => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todosState);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch, todos]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h2> You have {todos && todos.length} tasks </h2>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h3>{todo.task}</h3>
          <p>Added: {moment(todo.date).fromNow()}</p>
          <button onClick={() => setTodo({ ...todo })}>Update</button>
          <button onClick={() => handleDelete(todo._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ListTodos;
