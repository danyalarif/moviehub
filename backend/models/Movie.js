import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images: [String],
    video: String
}, {timestamps: true})

const Movie = mongoose.model('Movie', movieSchema)
export default Movie