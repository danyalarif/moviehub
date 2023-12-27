import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true})

const Review = mongoose.model('Review', reviewSchema)
export default Review