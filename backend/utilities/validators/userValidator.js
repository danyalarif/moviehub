import { body } from "express-validator";

export const registerValidation = [
  body("firstName")
    .exists({ checkFalsy: true })
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string")
    .matches(/^[A-Za-z]{3,20}$/)
    .withMessage("User name should be between 3 and 20 characters long"),
  body("lastName")
    .exists({ checkFalsy: true })
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string")
    .matches(/^[A-Za-z]{3,20}$/)
    .withMessage("User name should be between 3 and 20 characters long"),
  body("email").isEmail().withMessage("Email should be valid"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?^&])[A-Za-z\d@$!%*#?^&]{8,}$/)
    .withMessage(
      "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number"
    ),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Email should be valid"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .matches( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?^&])[A-Za-z\d@$!%*#?^&]{8,}$/)
    .withMessage(
      "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number"
    ),
];