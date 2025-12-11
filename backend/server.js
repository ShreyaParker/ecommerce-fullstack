import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
connectDB();

app.get("/",(req,res)=>{
    res.send("API IS RUNNING")
})

app.listen(PORT,()=>{
    console.log("Listening on port",PORT)
})