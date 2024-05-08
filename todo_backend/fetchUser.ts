import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number | string;
  };
}

const fetchuser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("token");

  if (!token) {
    return res.status(401).send({ error: "Authentication failed" });
  }
  try {
    if (!process.env.SECRET_KEY) {
      return new Error("SECRET_KEY environment variable is not set");
    }

    const data: any = jwt.verify(token, process.env.SECRET_KEY);
    req.user = data.user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Authentication failed" });
  }
};

export default fetchuser;
