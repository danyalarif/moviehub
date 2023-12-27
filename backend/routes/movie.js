import express from "express";
import { createMovie, deleteMovie, findMovies } from "../controllers/movieController.js";
import checkToken from "../middleware/checkToken.js";
import { movieValidation } from "../utilities/validators/movieValidator.js";

const router = express.Router()

router.post('/', checkToken, movieValidation, createMovie)
router.get('/:filters/:offset/:limit', findMovies)
router.delete('/:id', checkToken, deleteMovie)

export default router