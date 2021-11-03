import { useState } from "react";
import AddTodo from "./components/AddTodo";
import ListTodos from "./components/ListTodos";

import "./App.css";

const App = () => {
  const [todo, setTodo] = useState({
    task: "",
    isComplete: false,
  });

  return (
    <div className="App">
      <h2>Todo App</h2>
      <AddTodo todo={todo} setTodo={setTodo} />
      <ListTodos setTodo={setTodo} />
    </div>
  );
};

export default App;
