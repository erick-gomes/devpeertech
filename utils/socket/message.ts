import { Server, Socket } from "socket.io"

export const mensagemInput = (message: string, file: { base64url: String, mimetype: String, size: Number }, io: Server, socket: Socket) => {
    return [
        new Promise<void>((resolve, reject) => {
            if (message) {
                const msgSend = message.trim()
                msgSend.length > 5000 && reject(new Error('maxlength'))
            }
            resolve()
        }),
        new Promise<void>((resolve, reject) => {
            if (file) {
                io.emit('msg', {
                    file: {
                        url: file.base64url,
                        type: file.mimetype
                    }
                })
            }
            if (message) {
                const msgSend = message.trim()
                if (msgSend === '') return
                io.emit('msg', { msg: msgSend })
            }
            resolve()
        })
    ]
}
