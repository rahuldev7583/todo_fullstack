"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const Task = mongoose_1.default.model("Task", TaskSchema);
exports.default = Task;
