import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true, // allow sending cookies if needed
  })
);

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/user", authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
