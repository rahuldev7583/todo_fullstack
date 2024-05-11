"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
const allowedOrigins = ["http://localhost:5173"];
const options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
// app.use(cors({ origin: "http://localhost:5173" }));
//send to local host db
if (process.env.DATABASE_URL) {
    const mongoURI = process.env.DATABASE_URL;
    // Use mongoURI here
    const connectToMongo = () => {
        mongoose_1.default
            .connect(mongoURI)
            .then(() => console.log("Connected to Mongo succesfully"));
    };
    connectToMongo();
}
else {
    throw new Error("DATABASE_URL environment variable is not set");
}
app.get("/", (req, res) => {
    res.send("This is a Todo app");
});
app.use(express_1.default.json());
// app.use((req, res, next) => {
//   res.setHeader("Referrer-Policy", "'no-referrer'");
//   next();
// });
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   next();
// });
//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));
app.listen(process.env.PORT, () => console.log(`Todo app is listening on ${process.env.PORT}`));
