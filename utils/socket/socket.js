import { Server } from 'socket.io'
import requestIp from 'request-ip'
import mensagemInput from '../socket/message'
import ss from 'socket.io-stream'

export default function (req, res) {
    return new Promise((resolve, reject) => {
        if (!res.socket.server.io) {
            console.log('Configurando socket.io...')

            const io = new Server(res.socket.server)
            ss(io)
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
                    io.emit('all-users', { users, ips })
                })

                const sizeMegaBytesMax = 100
                const chunks = []
                socket.on('bytes', (bytes, type) => {
                    if (!bytes) {
                        const buf = Buffer.concat(chunks)
                        if (buf.byteLength > ((2 ** 20) * sizeMegaBytesMax)) {
                            socket.emit('err', 'O arquivo é muito grande')
                            return
                        }
                        const base64 = buf.toString('base64')
                        io.emit('stream', base64, type)
                        chunks.splice(0, chunks.length)
                        return
                    }
                    chunks.push(bytes)
                })

                socket.on('message', async ({ message, file }) => {
                    try {
                        for await (const p of mensagemInput(message, file, io, socket)) {
                            if (p) console.log(p)
                        }
                    } catch (error) {
                        console.error(error)
                    }
                })
            })

            res.socket.server.io = io
        }
        resolve()
    })
}

export const fastRefresh = false
