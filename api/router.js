import { Router } from 'express'
import io from './server.js'

const router = Router()

// routes
router.get('/', (req, res) => {
    io.emit('message', 'minha mensagem')
    res.json({ welcome: 'Welcome Brlouco!' })
})

export default router
