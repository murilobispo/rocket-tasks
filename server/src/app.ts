import express from 'express'
import { authRoutes } from '@/routes/auth.routes'
import helmet from 'helmet'

const app = express()

app.use(express.json())
app.use(helmet())

app.get('/', (req, res) => {
  res.status(200).json({message: 'Rocket Tasks'})
})

app.use('/auth', authRoutes)

export default app