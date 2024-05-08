import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import fetchuser, { AuthenticatedRequest } from "../fetchUser";
import Task from "../models/Task";

const router = express.Router();

router.get("/", fetchuser, async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const task = await Task.find({ user: user.userId });

  res.json(task);
});

router.get(
  "/completedtask",
  fetchuser,
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const task = await Task.find({ user: user.userId, complete: true });

    res.json(task);
  }
);
router.post(
  "/addtask",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 4 }),
    body("description", "Enter at least 5 characters").isLength({ min: 8 }),
    body("date", "Enter a valid date"),
  ],
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { title, description, date } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = req.user;
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const task = new Task({
        title,
        description,
        date,
        user: user.userId,
      });
      const savedTask = await task.save();
      res.json(savedTask);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal error occured");
    }
  }
);

router.put(
  "/taskcomplete/:id",
  fetchuser,
  async (req: AuthenticatedRequest, res: Response) => {
    const complete = req.body.complete;
    try {
      //Find the note to be updated and update it.
      let task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).send("Not found");
      }
      const user = req.user;
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      if (!task.user || task.user.toString() !== user.userId) {
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
  }
);

router.delete(
  "/deletetask/:id",
  fetchuser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      let task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).send("Not found");
      }
      const user = req.user;
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      //Allow deletion only if user owns this note
      if (!task.user || task.user.toString() !== user.userId) {
        return res.status(401).send("Not Allowed");
      }
      task = await Task.findByIdAndDelete(req.params.id);
      res.json({ success: "Task deleted succesfully", task: task });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal error occured");
    }
  }
);

module.exports = router;
