import { Server } from 'socket.io'
import requestIp from 'request-ip'
import mensagemInput from '../socket/message'

export default function (req, res) {
    if (!res.socket.server.io) {
        console.log('Configurando socket.io...')

        const io = new Server(res.socket.server)

        const users = []
        const ips = []
        io.on('connection', (socket) => {
            const ip = requestIp.getClientIp(socket.request)
            users.push(socket.id)
            ips.push(ip)
            io.emit('con', { id: socket.id, ip })
            io.emit('all-users', { users, ips })
            socket.on('disconnect', () => {
                for (const key in users) {
                    if (Object.hasOwnProperty.call(users, key)) {
                        const user = users[key]
                        if (user === socket.id) {
                            users.splice(key, 1)
                        }
                    }
                }
                for (const key in ips) {
                    if (Object.hasOwnProperty.call(ips, key)) {
                        const ipDisconnect = ips[key]
                        if (ipDisconnect === ip) {
                            ips.splice(key, 1)
                        }
                    }
                }
                io.emit('dc', socket.id)
                io.emit('all-users', users)
            })

            socket.on('message', async ({ message, files }) => {
                try {
                    for await (const p of mensagemInput(message, files, io, socket)) {
                        if (p) console.log(p)
                    }
                } catch (error) {
                    console.error(error)
                }
            })
        })

        res.socket.server.io = io
    }
}
