import request from 'supertest'
import dotenv from 'dotenv'
import createServer from '../index'
dotenv.config()
//test data
const user = {
    firstName: 'Danyal',
    lastName: 'Ariff',
    email: 'danyalarif456@gmail.com',
    password: 'DanyalArif@123'
}
const loginUser = {
    email: 'danyalarif456@gmail.com',
    password: 'DanyalArif@123'
}
let app

beforeAll(async () => {
    jest.setTimeout(1000 * 10)
    app = await createServer(4000)
})
//testing user api
describe('user api testing', () => {
    it('should post a new user and return 200 status code', async () => {
        const res = await request(app).post('/user/register').send(user)
        expect(res.status).toBe(200)
    })
    it('should login with a user and return 200 status code', async () => {
        const res = await request(app).post('/user/login').send({email: loginUser.email, password: loginUser.password})
        expect(res.status).toBe(200)
    })
})

afterAll(async () => {
    await app.close()
})

