import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectToDB from "./config/config.js";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/authRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());

const port = 8080;
app.use("/api", chatRoutes);
app.use("/api/auth",authRoutes);


app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal Server Error" });
})

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectToDB();
});
