import express from 'express'
import LoginController from './controllers/LoginController.js'

const routers = express.Router()

routers.get('/', LoginController.Login)

export default routers
