import { createServer } from "node:http"
import next from "next"
import { Server } from "socket.io"
import requestIp from 'request-ip'
import { mensagemInput } from './utils/socket/message'

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = 3000

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler()

app.prepare().then(() => {
    const httpServer = createServer(handler)

    const io = new Server(httpServer)

    const users: string[] = []
    const ips: (string | undefined)[] = []

    io.on('connection', (socket) => {
        const ip = requestIp.getClientIp(socket.request)
        users.push(socket.id)
        if (ip !== null) {
            ips.push(ip)
        }
        io.emit('con', { id: socket.id, ip })
        io.emit('all-users', { users, ips })
        socket.on('disconnect', () => {
            for (const key in users) {
                if (Object.hasOwnProperty.call(users, key)) {
                    const user = users[key]
                    if (user === socket.id) {
                        users.splice(parseInt(key), 1)
                    }
                }
            }
            for (const key in ips) {
                if (Object.hasOwnProperty.call(ips, key)) {
                    const ipDisconnect = ips[key]
                    if (ipDisconnect === ip) {
                        ips.splice(parseInt(key), 1)
                    }
                }
            }
            io.emit('dc', socket.id)
            io.emit('all-users', { users, ips })
        })

        const sizeMegaBytesMax = 100
        const chunks: Buffer[] = []
        socket.on('bytes', (bytes: Buffer | false, type: string) => {
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

        socket.on('message', async ({ message, file }: { message: string, file: { base64url: string, mimetype: string, size: number } }) => {
            try {
                // resolver todas as promessas e esperar sem usar for await
                const promises = mensagemInput(message, file, io, socket)
                for (const p of promises) {
                    await p
                }
            } catch (error) {
                console.error(error)
            }
        })
    })

    httpServer.listen(port, () => {
        console.log(`> Servidor em ação http://${hostname}:${port}`)
    })
})
