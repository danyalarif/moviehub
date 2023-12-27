import express from "express";
import connectDB from './utilities/db/index.js'
import dotenv from 'dotenv'
import errorHandler from "./middleware/errorHandler.js";
import intializeRoutes from "./routes/index.js";
import cors from './middleware/cors.js'
dotenv.config()

const app = express()

connectDB()

app.use(express.json())
app.use(cors)
intializeRoutes(app)
app.use(errorHandler)


export default app