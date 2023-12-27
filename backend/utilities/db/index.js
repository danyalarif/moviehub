import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('db connected')
    } catch(e) {
        console.log(e)
        process.exit(1)
    }
}
//no need to export mongoose instance since mongoose is singelton by default
export default connectDB