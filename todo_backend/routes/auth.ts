import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User";
import fetchuser, { AuthenticatedRequest } from "../fetchUser";

const router = express.Router();

router.get(
  "/username/",
  fetchuser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const id = req.user?.userId;
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user.name);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal error occurred");
    }
  }
);

const sendVerificationEmail = async (userEmail: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const verificationLink = `https://todo-backend-rahul.vercel.app/api/auth/verify/${token}`;
    const info = await transporter.sendMail({
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
  } catch (error) {
    console.error(error);
  }
};
router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter at least 5 characters").isLength({ min: 5 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exits" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
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
      const token = jwt.sign(payload, secretKey);
      await sendVerificationEmail(req.body.email, token);

      res.json({ message: "Signup succesfully. Go verify your email" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal error occured");
    }
  }
);
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter at least 5 characters").exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        res.status(400).json({ error: "LogIn with correct credentials" });
      } else if (!(await bcrypt.compare(password, user.password))) {
        res.status(400).json({ error: "LogIn with correct credentials" });
      } else if (!user.isVerified) {
        res.status(400).json({ error: "Verify your email" });
      } else {
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
        const token = jwt.sign(payload, secretKey);
        res.json({ token });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal error occured");
    }
  }
);
router.get("/verify/:token", async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      return res
        .status(404)
        .json({ message: "SECRET_KEY environment variable not defined" });
    }
    const data = jwt.verify(token, secretKey) as JwtPayload;
    let user = data.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user in the database by email and mark them as verified
    user = await User.findOneAndUpdate(
      { email: user.email },
      { $set: { isVerified: true } },
      { new: true }
    );
    const LINK = process.env.REDIRECT_LINK;
    if (!LINK) {
      return res.redirect("/");
    }
    res.redirect(LINK);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal error occurred");
  }
});

module.exports = router;
