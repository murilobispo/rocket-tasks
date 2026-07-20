import express from 'express'
import { authRoutes } from '@/routes/auth.routes'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({message: 'Rocket Tasks'})
})

app.use('/auth', authRoutes)

export default app