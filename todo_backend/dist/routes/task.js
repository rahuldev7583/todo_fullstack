"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const fetchUser_1 = __importDefault(require("../fetchUser"));
const Task_1 = __importDefault(require("../models/Task"));
const router = express_1.default.Router();
router.get("/", fetchUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const task = yield Task_1.default.find({ user: user.userId });
    res.json(task);
}));
router.get("/completedtask", fetchUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const task = yield Task_1.default.find({ user: user.userId, complete: true });
    res.json(task);
}));
router.post("/addtask", fetchUser_1.default, [
    (0, express_validator_1.body)("title", "Enter a valid title").isLength({ min: 4 }),
    (0, express_validator_1.body)("description", "Enter at least 5 characters").isLength({ min: 8 }),
    (0, express_validator_1.body)("date", "Enter a valid date"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, date } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = req.user;
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const task = new Task_1.default({
            title,
            description,
            date,
            user: user.userId,
        });
        const savedTask = yield task.save();
        res.json(savedTask);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal error occured");
    }
}));
router.put("/taskcomplete/:id", fetchUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const complete = req.body.complete;
    try {
        //Find the note to be updated and update it.
        let task = yield Task_1.default.findById(req.params.id);
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
        task = yield Task_1.default.findByIdAndUpdate(req.params.id, { $set: { complete: complete } }, { new: true });
        res.json(task);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal error occured");
    }
}));
router.delete("/deletetask/:id", fetchUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = yield Task_1.default.findById(req.params.id);
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
        task = yield Task_1.default.findByIdAndDelete(req.params.id);
        res.json({ success: "Task deleted succesfully", task: task });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal error occured");
    }
}));
module.exports = router;
