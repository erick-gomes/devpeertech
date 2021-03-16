import express from 'express'
import routers from './router.js'

const app = express()

app.use(express.json())
app.use(routers)

app.listen(8080, () => console.log('Listen to port 8080'))
