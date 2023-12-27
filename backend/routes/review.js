import express from 'express'
import { createReview, deleteReview, editReview, findReviews } from '../controllers/reviewController.js'
import checkToken from '../middleware/checkToken.js'
import { reviewValidation } from '../utilities/validators/reviewValidator.js'

const router = express.Router()

router.post('/', checkToken, reviewValidation, createReview)
router.get('/:movieid', findReviews)
router.put('/:id', checkToken, editReview)
router.delete('/:id', checkToken, deleteReview)

export default router