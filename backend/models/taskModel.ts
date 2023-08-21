import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["Assignment", "Activity"],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const task = mongoose.model("task", taskSchema, "tasks");

export default task;
