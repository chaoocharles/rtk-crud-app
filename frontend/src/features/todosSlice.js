import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  status: null,
  error: "",
  getTodosStatus: null,
  getTodosError: "",
  deleteTodoStatus: null,
  deleteTodoError: "",
};

export const todosAdd = createAsyncThunk(
  "todos/todosAdd",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/todos",
        todo
      );
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
      const response = await axios.get("http://localhost:5000/api/todos");
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
      const response = await axios.delete(
        "http://localhost:5000/api/todos/" + id
      );
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
      state.status = "pending";
    },
    [todosAdd.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
      state.status = "success";
    },
    [todosAdd.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [getTodos.pending]: (state, action) => {
      state.getTodosStatus = "pending";
    },
    [getTodos.fulfilled]: (state, action) => {
      state.todos = action.payload;
      state.getTodosStatus = "success";
    },
    [getTodos.rejected]: (state, action) => {
      state.getTodosStatus = "rejected";
      state.getTodosError = action.payload;
    },
    [deleteTodo.pending]: (state, action) => {
      state.deleteTodoStatus = "pending";
    },
    [deleteTodo.fulfilled]: (state, action) => {
      const currentTodos = state.todos.filter(
        (todo) => todo._id !== action.payload._id
      );
      state.todos = currentTodos;
      state.deleteTodoStatus = "success";
    },
    [deleteTodo.rejected]: (state, action) => {
      state.deleteTodoStatus = "rejected";
      state.deleteTodoError = action.payload;
    },
  },
});

export default todosSlice.reducer;
