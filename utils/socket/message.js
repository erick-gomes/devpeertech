/**
 *
 * @param {String} message mensagem de texto
 * @param {Array<{base64url:String,mimetype:String}>} files anexos da mensagem
 * @param {Server} io instância do servidor
 * @param {Socket} socket instância do cliente
 * @returns
 */
export default function mensagemInput (message, files, io, socket) {
    const msgSend = message.trim()
    return [
        new Promise((resolve, reject) => {
            if (msgSend && msgSend.length > 5000) {
                reject(new Error('maxlength'))
            }
            resolve()
        }),
        new Promise((resolve, reject) => {
            if (files) {
                const sendFiles = []
                for (const file of files) {
                    console.log(file.mimetype)
                    sendFiles.push(file.base64url)
                }
                io.emit('msg', { msg: msgSend, files: sendFiles })
            } else {
                io.emit('msg', { msg: msgSend })
            }
            resolve()
        })
    ]
}
