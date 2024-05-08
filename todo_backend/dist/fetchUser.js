"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fetchuser = (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).send({ error: "Authentication failed" });
    }
    try {
        if (!process.env.SECRET_KEY) {
            return new Error("SECRET_KEY environment variable is not set");
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = data.user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ error: "Authentication failed" });
    }
};
exports.default = fetchuser;
