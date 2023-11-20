const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
//send to local host db
const mongoURI = process.env.DATABASE_URL;

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to Mongo succesfully"));
};
connectToMongo();

app.get("/", (req, res) => {
  res.send("This is todo app");
});

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));

app.listen(process.env.PORT, () =>
  console.log(`Todo app is listening on ${process.env.PORT}`)
);
