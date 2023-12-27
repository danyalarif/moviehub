import Review from "../models/Review.js"

export const addReview = async (review) => {
    const newReview = new Review(review)
    return await newReview.save()
}

export const updateReview = async (id, review) => {
    return await Review.findByIdAndUpdate(id, review)
}

export const getReviews = async (filters) => {
    return await Review.find(filters).populate('user').lean()
}

export const getReview = async (filters) => {
    return await Review.findOne(filters).lean()
}

export const destroyReview = async (id) => {
    return await Review.findByIdAndDelete(id)
}

export const destroyReviews = async (filters) => {
    return await Review.deleteMany(filters)
}