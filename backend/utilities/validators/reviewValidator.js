import { body } from "express-validator";

export const reviewValidation = [
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required")
    .isString()
    .withMessage("Description should be string")
    .matches(/^[A-Za-z\s]{3,200}$/)
    .withMessage("Description should be between 3 and 200 characters long"),
    body("movie")
    .exists({ checkFalsy: true })
    .withMessage("Movie id is required")
    .isString()
    .withMessage("Movie id should be string")
    .matches(/^[a-f\d]{24}$/i)
    .withMessage("Movie id should be a valid id"),
    body("stars")
    .exists({ checkFalsy: true })
    .withMessage("Stars is required")
    .isNumeric()
    .withMessage("Stars should be a number")
];
