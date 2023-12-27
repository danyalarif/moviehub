import userRouter from './user.js'
import movieRouter from './movie.js'
import reviewRouter from './review.js'
function intializeRoutes(app) {
    app.use('/user', userRouter)
    app.use('/movie', movieRouter)
    app.use('/review', reviewRouter)
}

export default intializeRoutes