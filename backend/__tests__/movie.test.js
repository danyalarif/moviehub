import request from 'supertest'
import dotenv from 'dotenv'
import createServer from '../index'
import { getMovie } from '../services/movieService'
dotenv.config()
//test data
const movie = {
    title: 'Avengers 2012',
    summary: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    images: ['https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/03/IMG_1887-scaled.jpeg'],
    video: 'https://www.youtube.com/watch?v=eOrNdBpGMv8',
    genres: ['Action', 'Fantasy', 'Comedy'],
    duration: 200
}
const movie2 = {
    title: 'Avengers Endgame',
    summary: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    images: ['https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/03/IMG_1887-scaled.jpeg'],
    video: 'https://www.youtube.com/watch?v=eOrNdBpGMv8',
    genres: ['Action', 'Fantasy', 'Comedy'],
    duration: 200
}
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
describe('movie api testing', () => {
    it('should post a new movie and return 200 status code', async () => {
        const loginRequest = await request(app).post('/user/login').send({email: loginUser.email, password: loginUser.password})
        const res = await request(app).post('/movie').set('Authorization', loginRequest.body.data).send(movie)
        expect(res.status).toBe(200)
        await request(app).post('/movie').set('Authorization', loginRequest.body.data).send(movie2)
    })
    it('should get all movies and return 200 status code', async () => {
        const res = await request(app).get(`/movie/${JSON.stringify({})}/0/100`)
        expect(res.status).toBe(200)
    })
    it('should delete a movie and return 200 status code', async () => {
        const loginRequest = await request(app).post('/user/login').send({email: loginUser.email, password: loginUser.password})
        const tempMovie = await getMovie({title: movie.title})
        const res = await request(app).delete(`/movie/${tempMovie._id}`).set('Authorization', loginRequest.body.data)
        expect(res.status).toBe(200)
    })
})

afterAll(async () => {
    await app.close()
})

