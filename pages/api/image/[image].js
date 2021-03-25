import fs from 'fs'
import path from 'path'

export default async function handler (req, res) {
    const directory = path.resolve(process.cwd(), 'images')
    const categorias = fs.readdirSync(directory)
    if (req.method === 'GET') {
        let categoria
        for (const categoriaId in categorias) {
            if (categorias[categoriaId] === `${req.query.image}.png`) {
                categoria = `${req.query.image}.png`
                break
            }
        }
        if (categoria) {
            const caminho = path.resolve(process.cwd(), 'images', categoria)
            const base64 = fs.readFileSync(caminho, { encoding: 'base64' })
            res.status(200).json({ status: '200', base64: `data:image/png;base64,${base64}` })
        } else {
            res.status(404).json({ status: '404', message: 'Not Found' })
        }
    } else {
        res.status(404).json({ status: '404', message: 'GET ONLY' })
    }
}
