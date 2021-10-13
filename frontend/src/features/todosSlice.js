import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  status: null,
};

export const todosAdd = createAsyncThunk("products/todosAdd", async (todo) => {
  try {
    const response = await axios.post("http://localhost:5000/api/todos", todo);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const todosSlice = createSlice({
  name: "products",
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
    },
  },
});

export default todosSlice.reducer;
