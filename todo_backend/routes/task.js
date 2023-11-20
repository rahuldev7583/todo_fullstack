const express = require("express");
const Task = require("./../models/Task");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchuser = require("../fetchUser");
const router = express.Router();

router.get("/", fetchuser, async (req, res) => {
  const task = await Task.find({ user: req.user.userId });

  res.json(task);
});

router.get("/completedtask", fetchuser, async (req, res) => {
  const task = await Task.find({ user: req.user.userId, complete: true });

  res.json(task);
});
router.post(
  "/addtask",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 4 }),
    body("description", "Enter at least 5 characters").isLength({ min: 8 }),
    body("date", "Enter a valid date"),
  ],
  async (req, res) => {
    try {
      const { title, description, date } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = new Task({
        title,
        description,
        date,
        user: req.user.userId,
      });
      const savedTask = await task.save();
      res.json(savedTask);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal error occured");
    }
  }
);

router.put("/taskcomplete/:id", fetchuser, async (req, res) => {
  const complete = req.body.complete;
  try {
    //Find the note to be updated and update it.
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send("Not found");
    }

    if (task.user.toString() !== req.user.userId) {
      return res.status(401).send("Not Allowed");
    }
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { complete: complete } },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error occured");
  }
});

router.delete("/deletetask/:id", fetchuser, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send("Not found");
    }
    //Allow deletion only if user owns this note
    if (task.user.toString() !== req.user.userId) {
      return res.status(401).send("Not Allowed");
    }
    task = await Task.findByIdAndDelete(req.params.id);
    res.json({ success: "Task deleted succesfully", task: task });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error occured");
  }
});

module.exports = router;
