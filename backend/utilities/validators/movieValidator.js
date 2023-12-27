import { body } from "express-validator";

export const movieValidation = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Movie title is required")
    .isString()
    .withMessage("Movie title should be string")
    .matches(/^[A-Za-z0-9\s]{3,100}$/)
    .withMessage("Title should be between 3 and 100 characters long"),
  body("summary")
    .exists({ checkFalsy: true })
    .withMessage("Summary is required")
    .isString()
    .withMessage("Summary should be string")
    .isLength({min: 3, max: 500})
    .withMessage("Summary should be between 3 and 500 characters long"),
    body("genres")
    .exists({ checkFalsy: true })
    .withMessage("Genre is required")
    .isArray()
    .withMessage("Genre should be string array"),
    body("duration")
    .exists({ checkFalsy: true })
    .withMessage("Duration is required")
    .isNumeric()
    .withMessage("Duration should be a number")
];
