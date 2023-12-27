import { validationResult } from "express-validator"
import { addMovie, destroyMovie, getMovie, getMovies } from "../services/movieService.js"
import { destroyReviews } from "../services/reviewService.js"
import RequestError from "../utilities/error/RequestError.js"

export const createMovie = async (req, res, next) => {
    //detecting errors in req.body
    const errors = validationResult(req)
    if (!(errors.isEmpty())) return next(new RequestError({code: 406, message: 'Invalid inputs', context: errors.array()?.[0]}))
    let movie
    try {
        if (await getMovie({title: req.body.title})) return next(new RequestError({code: 409, message: 'Movie already exists!'}))
        req.body.createdBy = req.user._id
        movie = await addMovie(req.body)
    } catch(e) {
        return next(new RequestError({code: e.code, message: e.message, context: e}))
    }
    res.json({message: 'Movie added successfully!', data: movie})
}

export const findMovies = async (req, res, next) => {
    let movies
    try {
        movies = await getMovies(JSON.parse(req.params.filters) || {}, parseInt(req.params.offset), parseInt(req.params.limit))
    } catch(e) {
        return next(new RequestError({code: e.code, message: e.message, context: e}))
    }
    res.json({data: movies})
}
export const deleteMovie = async (req, res, next) => {
    let movie
    try {
        //verifying if the authenticated user is the creator of the movie
        movie = await getMovie({_id: req.params.id})
        if (movie.createdBy.toString() !== req.user._id) return next(new RequestError({code: 403, message: 'You are not authorized to delete this movie!'}))
        movie = await destroyMovie(req.params.id)
        //deleting dependent reviews
        await destroyReviews({movie: req.params.id})
    } catch(e) {
        return next(new RequestError({code: e.code, message: e.message, context: e}))
    }
    res.json({message: 'Movie deleted successfully!', data: movie})
}