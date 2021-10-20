import "./App.css";
import AddTodo from "./components/AddTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <>
      <h2>Todo App</h2>
      <AddTodo />
      <ListTodos />
    </>
  );
}

export default App;
