import mongoose from 'mongoose'
import server from './server.js'

const createServer = async (appPort) => {
    const port = appPort || process.env.PORT || 5000
    return server.listen(port, () => {
        console.log('app listening on port', + port)
    })
}
mongoose.connection.on('connected', () => {
    createServer()
})

export default createServer