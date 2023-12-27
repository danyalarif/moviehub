import User from "../models/User.js"

export const addUser = async (user) => {
    const newUser = new User(user)
    return await newUser.save()
}

export const getUser = async (filters) => {
    return await User.findOne(filters).lean()
}