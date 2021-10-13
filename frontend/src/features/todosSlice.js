import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  status: null,
  error: "",
};

export const todosAdd = createAsyncThunk(
  "products/todosAdd",
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
      state.error = action.payload;
    },
  },
});

export default todosSlice.reducer;
