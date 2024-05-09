import express from "express";
import mongoose from "mongoose";
import cors from "cors";

require("dotenv").config();
const app = express();

app.use(cors());

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
//   res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
//   next();
// });

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));

app.listen(process.env.PORT, () =>
  console.log(`Todo app is listening on ${process.env.PORT}`)
);
