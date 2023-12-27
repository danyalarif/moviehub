import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { getUser } from '../services/userService.js';
import RequestError from '../utilities/error/RequestError.js';
dotenv.config()

const checkToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return next(new RequestError({ code: 401, message: "Invalid Token!" }));
      } else {
        const newUser = await getUser({ _id: user._id })
        newUser._id = newUser?._id?.toString();
        req.user = newUser;
        next();
      }
    });
  } else {
    return next(new RequestError({ code: 401, message: "Token missing!" }));
  }
};
export default checkToken
