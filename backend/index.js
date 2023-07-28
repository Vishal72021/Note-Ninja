import connectToMongo from "./db.js";
import express from "express";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/notes.js";
const app = express();
const localhost = "127.0.0.1";
const port = 5000;

connectToMongo();

app.get("/", (req, res) => {
  res.send("Hello user!\nWelcome to Note Ninja...");
});

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

app.listen(port, localhost, () => {
  console.log(`Server listening on http://${localhost}:${port}`);
});
