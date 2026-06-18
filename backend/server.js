import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongdb.js";

import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Explicitly configure CORS with your Vercel URL
app.use(
  cors({
    origin: "https://text-to-image-generator-nu.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

await connectDB();

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});