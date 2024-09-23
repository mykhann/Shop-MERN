import express from 'express';
import "dotenv/config"
import { connectToDatabase } from './src/db/index.js';
import userRoutes from "./src/routes/user.route.js"
import productRoutes from "./src/routes/product.route.js"
import orderRoutes from "./src/routes/order.route.js"
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

// Middlewares 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// CORS 
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))

// Database
connectToDatabase()

// Routes
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/orders", orderRoutes)




export default app