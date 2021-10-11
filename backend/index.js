import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todos from "./routes/todos.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", todos);

app.get("/", (req, res) => {
  res.send("welcome to the todos api...");
});

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
