/**
 *
 * @param {String} message mensagem de texto
 * @param {{base64url:String,mimetype:String,size:Number}} file anexo da mensagem
 * @param {Server} io instância do servidor
 * @param {Socket} socket instância do cliente
 * @returns
 */
export default function mensagemInput (message, file, io, socket) {
    return [
        new Promise((resolve, reject) => {
            if (message) {
                const msgSend = message.trim()
                msgSend.length > 5000 && reject(new Error('maxlength'))
            }
            resolve()
        }),
        new Promise((resolve, reject) => {
            console.log('chegou aqui')
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
