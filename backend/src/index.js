import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import couponRoutes from "./routes/couponRoutes.js";

dotenv.config({
    path: './env'
});

connectDB();
const origin = process.env.ORIGIN || "http://localhost:3000"

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin }));
app.use(cookieParser());

app.use("/api/coupons", couponRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
