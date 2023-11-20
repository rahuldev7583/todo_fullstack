const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
