import verifyServerSession from '../../../components/session/Session'
import Central from '../../../models/Central'
import fs from 'fs'
import path from 'path'

export default async function handler (req, res) {
    if (req.method === 'POST') {
        try {
            const r = await verifyServerSession({ req })
            if (r.redirect) {
                return res.status(401).json({ status: '401', message: 'Unauthorized' })
            }
            if (!(req.body.subject) || !(req.body.category) || !(req.body.content)) {
                return res.redirect('/forum/create?error=undefined')
            }

            // verificação das categorias
            const directory = path.resolve(process.cwd(), 'images')
            const categorias = fs.readdirSync(directory)
            const categoryAcept = []
            for (const categoria of categorias) {
                categoryAcept.push(categoria.replace('.png', ''))
            }
            const aceptCat = categoryAcept.filter(cat => cat === req.body.category)
            if (!aceptCat[0]) return res.redirect('/forum/create?error=catinvalid')

            // verificação do assunto
            if (req.body.subject.length > 50) {
                return res.redirect('/forum/create?error=submax')
            } else if (req.body.subject.length < 5) {
                return res.redirect('/forum/create?error=submin')
            }

            // verificação do conteúdo
            if (req.body.content.length > 60000) {
                return res.redirect('/forum/create?error=contmax')
            } else if (req.body.content.length < 50) {
                return res.redirect('/forum/create?error=contmin')
            }

            // criação da postagem
            const subject = req.body.subject
            const category = req.body.category
            const content = req.body.content
            const username = r.session.username
            const datePost = new Date().toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
            const { Login } = Central
            const login = await Login.findOne({
                where: { username }
            })

            if (!login) return res.status(500).json({ status: '500', message: 'Internal Server Error' })
            await login.createPost({
                subject,
                category,
                content,
                datePost
            })

            return res.redirect('/forum/create?success=true')
        } catch (error) {
            res.status(500).json({ status: '500', message: 'Internal Server Error' })
        }
    } else {
        res.status(405).json({ status: '405', message: 'Method Not Allowed' })
    }
}
