import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/api/";

const initialState = {
  todos: [],
  addTodoStatus: "",
  addTodoError: "",
  getTodosStatus: "",
  getTodosError: "",
  deleteTodoStatus: "",
  deleteTodoError: "",
  updateTodoStatus: "",
  updateTodoError: "",
};

export const todosAdd = createAsyncThunk(
  "todos/todosAdd",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL + "todos", todo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseURL + "todos");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseURL + "todos/" + id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const { _id, task, author, isComplete, date, uid } = todo;

      const response = await axios.put(baseURL + "todos/" + _id, {
        task,
        author,
        isComplete,
        date,
        uid,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [todosAdd.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "pending",
        addTodoError: "",
        getTodosStatus: "",
        getTodosError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
      };
    },
    [todosAdd.fulfilled]: (state, action) => {
      // state.todos.push(action.payload);
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        addTodoStatus: "success",
        addTodoError: "",
        getTodosStatus: "",
        getTodosError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
      };
    },
    [todosAdd.rejected]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "rejected",
        addTodoError: action.payload,
        getTodosStatus: "",
        getTodosError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
      };
    },
    [getTodos.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodosStatus: "pending",
        getTodosError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
      };
    },
    [getTodos.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: action.payload,
        addTodoStatus: "",
        addTodoError: "",
        getTodosStatus: "success",
        getTodosError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
      };
    },
    [getTodos.rejected]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodosStatus: "rejected",
        getTodosError: action.payload,
        deleteTodoStatus: "",
        deleteTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
      };
    },
    [deleteTodo.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodosStatus: "",
        getTodosError: "",
        deleteTodoStatus: "pending",
        deleteTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
      };
    },
    [deleteTodo.fulfilled]: (state, action) => {
      const currentTodos = state.todos.filter(
        (todo) => todo._id !== action.payload._id
      );
      return {
        ...state,
        todos: currentTodos,
        addTodoStatus: "",
        addTodoError: "",
        getTodosStatus: "",
        getTodosError: "",
        deleteTodoStatus: "success",
        deleteTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
      };
    },
    [deleteTodo.rejected]: (state, action) => {
      state = {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodosStatus: "",
        getTodosError: "",
        deleteTodoStatus: "rejected",
        deleteTodoError: action.payload,
        updateTodoStatus: "",
        updateTodoError: "",
      };
    },
    [updateTodo.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodosStatus: "",
        getTodosError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        updateTodoStatus: "pending",
        updateTodoError: "",
      };
    },
    [updateTodo.fulfilled]: (state, action) => {
      const updatedTodos = state.todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        addTodoStatus: "",
        addTodoError: "",
        getTodosStatus: "",
        getTodosError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        updateTodoStatus: "success",
        updateTodoError: "",
      };
    },
    [updateTodo.rejected]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodosStatus: "",
        getTodosError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        updateTodoStatus: "rejected",
        updateTodoError: action.payload,
      };
    },
  },
});

export default todosSlice.reducer;
