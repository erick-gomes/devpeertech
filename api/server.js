import http from 'http'
import { Server } from 'socket.io'
import express from 'express'
import cors from 'cors'
import router from './router.js'

// config
const port = 80
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

const server = http.createServer(app)
const io = new Server(server)

// socket.io
io.on('connection', socket => {
    console.log(socket)
})

server.listen(port, () => {
    console.log(`Connected to port ${port}`)
})

export default io
