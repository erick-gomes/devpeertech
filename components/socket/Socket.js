import { Server } from 'socket.io'

export default function (res) {
    if (!res.socket.server.io) {
        console.log('Configurando socket.io...')
    
        const io = new Server(res.socket.server)
        
        const users = []
        io.on('connection', socket => {
            users.push(socket.id)
            io.emit('con', socket.id)
            io.emit('all-users', users)

            socket.once('disconnect', () => {
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
        })
    
        res.socket.server.io = io
    }
}