import request from 'supertest'
import dotenv from 'dotenv'
import createServer from '../index'
import { getMovie } from '../services/movieService'
import { getReview } from '../services/reviewService'
dotenv.config()
//test data
const review = {
    description: "This movie is awesome",
    stars: 4,
};
const loginUser = {
    email: 'danyalarif456@gmail.com',
    password: 'DanyalArif@123'
}
let app

jest.setTimeout(10000 * 10)
beforeAll(async () => {
    app = await createServer(4000)
})
//testing user api
describe('review api testing', () => {
    it('should post a new review and return 200 status code', async () => {
        const tempMovie = await getMovie({title: 'Avengers Endgame'})
        expect(tempMovie).not.toBeNull()
        review.movie = tempMovie._id
        const loginRequest = await request(app).post('/user/login').send({email: loginUser.email, password: loginUser.password})
        const res = await request(app).post('/review').set('Authorization', loginRequest.body.data).send(review)
        expect(res.status).toBe(200)
    })
    it('should edit a review and return 200 status code', async () => {
        const loginRequest = await request(app).post('/user/login').send({email: loginUser.email, password: loginUser.password})
        const tempUser = await request(app).get('/user/me').set('Authorization', loginRequest.body.data)
        const tempReview = await getReview({user: tempUser.body.data._id})
        const res = await request(app).put(`/review/${tempReview._id}`).set('Authorization', loginRequest.body.data).send({description: 'This movie is awesome!'})
        expect(res.status).toBe(200)
    })
    it('should delete a review and return 200 status code', async () => {
        const loginRequest = await request(app).post('/user/login').send({email: loginUser.email, password: loginUser.password})
        const tempUser = await request(app).get('/user/me').set('Authorization', loginRequest.body.data)
        const tempReview = await getReview({user: tempUser.body.data._id})
        const res = await request(app).delete(`/review/${tempReview._id}`).set('Authorization', loginRequest.body.data)
        expect(res.status).toBe(200)
    })
})

afterAll(async () => {
    await app.close()
})

