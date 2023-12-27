import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

//creating compound index to speed-up login query
userSchema.index({ email: 1, password: 1 }, { unique: true })
const User = mongoose.model('User', userSchema)
export default User 