import { validationResult } from "express-validator"
import RequestError from "../utilities/error/RequestError.js"
import { addUser, getUser } from "../services/userService.js"
import generateToken from '../utilities/jwt/generateToken.js'
import bcrypt from 'bcryptjs'
export const register = async (req, res, next) => {
    //detecting errors in req.body
    const errors = validationResult(req)
    if (!(errors.isEmpty())) return next(new RequestError({code: 406, message: 'Invalid inputs', context: errors.array()?.[0]}))
    let user
    try {
       //if email already exists, throw error
       if (await getUser({email: req.body.email})) return next(new RequestError({code: 409, message: 'User already exists'}))
       //hashing password
       req.body.password = await bcrypt.hash(req.body.password, 10)
       user = await addUser(req.body) 
    } catch (e) {
        console.log(e)
        return next(new RequestError({code: e.code, message: e.message, context: e}))
    }
    res.json({message: 'User registered successfully!', data: user})
}
export const login = async (req, res, next) => {
    const errors = validationResult(req)
    if (!(errors.isEmpty())) return next({code: 406, message: 'Invalid inputs', context: errors.array()?.[0]})
    let user, isValid
    try {
       //user = await getUser({email: req.body.email, password: req.body.password})
       user = await getUser({email: req.body.email})
       //compare hashed password
       if (user) isValid = await bcrypt.compare(req.body.password, user.password)  
    } catch (e) {
        return next(new RequestError({code: 400, message: 'Something went wrong', context: e}))
    }
    if (user && isValid) res.json({message: 'User logged in successfully!', data: generateToken(user)})
    else return next(new RequestError({code: 401, message: 'Invalid credentials'}))
}
export const getAuthorizedUser = (req, res, next) => {
    res.json({data: req.user})
}