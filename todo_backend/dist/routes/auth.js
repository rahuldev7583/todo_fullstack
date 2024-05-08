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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = __importDefault(require("../models/User"));
const fetchUser_1 = __importDefault(require("../fetchUser"));
const router = express_1.default.Router();
router.get("/username/", fetchUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const user = yield User_1.default.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user.name);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal error occurred");
    }
}));
const sendVerificationEmail = (userEmail, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASSWORD,
            },
        });
        const verificationLink = `https://todo-backend-rahul.vercel.app/api/auth/verify/${token}`;
        const info = yield transporter.sendMail({
            from: `Rahul Dev <${process.env.GMAIL}>`, // Sender's name and email
            to: userEmail, // Recipient's email address
            subject: "Verify Your Email for Todo App",
            html: `
      <!DOCTYPE html>
        <html>
          <body style="color: black">
            <h2>Welcome to the Todo App!</h2>
            <p>Hi there,</p>
            <p>
              Thank you for signing up for our Todo App. To get started, please click the button below to verify your email address:
            </p>
            <a href="${verificationLink}" style="background-color: #01dabb; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">Verify Email</a>
            <p>If you didn't sign up for our app, you can safely ignore this email.</p>
            <p>Happy task management!</p>
            <p>Best regards,</p>
            <p>Rahul Dev</p>
          </body>
        </html>
      `,
        });
        if (!userEmail) {
            return console.log({ message: "User not found" });
        }
    }
    catch (error) {
        console.error(error);
    }
});
router.post("/signup", [
    (0, express_validator_1.body)("name", "Enter a valid name").isLength({ min: 3 }),
    (0, express_validator_1.body)("email", "Enter a valid email").isEmail(),
    (0, express_validator_1.body)("password", "Enter at least 5 characters").isLength({ min: 5 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = yield User_1.default.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(400)
                .json({ error: "Sorry a user with this email already exits" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const secPassword = yield bcrypt_1.default.hash(req.body.password, salt);
        user = yield User_1.default.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        });
        const secretKey = process.env.SECRET_KEY;
        const payload = {
            user: {
                email: req.body.email,
            },
        };
        if (!secretKey) {
            return res
                .status(404)
                .json({ message: "SECRET_KEY environment variable not defined" });
        }
        const token = jsonwebtoken_1.default.sign(payload, secretKey);
        yield sendVerificationEmail(req.body.email, token);
        res.json({ message: "Signup succesfully. Go verify your email" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal error occured");
    }
}));
router.post("/login", [
    (0, express_validator_1.body)("email", "Enter a valid email").isEmail(),
    (0, express_validator_1.body)("password", "Enter at least 5 characters").exists(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = yield User_1.default.findOne({ email: email });
        if (!user) {
            res.status(400).json({ error: "LogIn with correct credentials" });
        }
        else if (!(yield bcrypt_1.default.compare(password, user.password))) {
            res.status(400).json({ error: "LogIn with correct credentials" });
        }
        else if (!user.isVerified) {
            res.status(400).json({ error: "Verify your email" });
        }
        else {
            const secretKey = process.env.SECRET_KEY;
            const payload = {
                user: {
                    userId: user.id,
                },
            };
            if (!secretKey) {
                return res
                    .status(404)
                    .json({ message: "SECRET_KEY environment variable not defined" });
            }
            const token = jsonwebtoken_1.default.sign(payload, secretKey);
            res.json({ token });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal error occured");
    }
}));
router.get("/verify/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.params.token;
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            return res
                .status(404)
                .json({ message: "SECRET_KEY environment variable not defined" });
        }
        const data = jsonwebtoken_1.default.verify(token, secretKey);
        let user = data.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Find the user in the database by email and mark them as verified
        user = yield User_1.default.findOneAndUpdate({ email: user.email }, { $set: { isVerified: true } }, { new: true });
        const LINK = process.env.REDIRECT_LINK;
        if (!LINK) {
            return res.redirect("/");
        }
        res.redirect(LINK);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal error occurred");
    }
}));
module.exports = router;
