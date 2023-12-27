import mongoose from 'mongoose'
import server from './server.js'
mongoose.connection.on('connected', () => {
    const port = process.env.PORT || 5000
    server.listen(port, () => {
        console.log('app listening on port', + port)
    })
})