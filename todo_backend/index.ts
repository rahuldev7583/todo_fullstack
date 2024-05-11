import express from "express";
import mongoose from "mongoose";
import cors from "cors";

require("dotenv").config();
const app = express();

// app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));

//send to local host db
if (process.env.DATABASE_URL) {
  const mongoURI: string = process.env.DATABASE_URL;
  // Use mongoURI here
  const connectToMongo = () => {
    mongoose
      .connect(mongoURI)
      .then(() => console.log("Connected to Mongo succesfully"));
  };
  connectToMongo();
} else {
  throw new Error("DATABASE_URL environment variable is not set");
}

app.get("/", (req, res) => {
  res.send("This is a Todo app");
});

app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader("Referrer-Policy", "'no-referrer'");
//   next();
// });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));

app.listen(process.env.PORT, () =>
  console.log(`Todo app is listening on ${process.env.PORT}`)
);
