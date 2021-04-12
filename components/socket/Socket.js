import { Server } from 'socket.io'
import requestIp from 'request-ip'

export default function (req, res) {
    if (!res.socket.server.io) {
        console.log('Configurando socket.io...')
    
        const io = new Server(res.socket.server)
        
        const users = []
        io.on('connection', socket => {
            socket.on('disconnect', () => {
                for (const key in users) {
                    if (Object.hasOwnProperty.call(users, key)) {
                        const user = users[key]
                        if (user === socket.id) {
                            users.splice(key, 1)
                        }
                    }
                }
                io.emit('dc', socket.id)
                io.emit('all-users', users)
            })
            users.push(socket.id)
            const ip = requestIp.getClientIp(req)
            io.emit('con', { id: socket.id, ip })
            io.emit('all-users', users)

            socket.on('message', ({ message, errors, files }) => {
                const msgSend = message.trim()
                if (msgSend && msgSend !== '' && msgSend.length < 100) {
                    if (files) {
                        for (const err of errors) {
                            socket.emit('error', err)
                            return
                        }
                        io.emit('msg', { msg: msgSend, files })
                    } else {
                        io.emit('msg', { msg: msgSend })
                    }
                } else {
                    socket.emit('error', 'msg-not-allow')
                }
            })
        })
    
        res.socket.server.io = io
    }
}