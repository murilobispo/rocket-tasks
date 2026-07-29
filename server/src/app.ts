import express from 'express'
import helmet from 'helmet'
import { authRoutes } from '@/routes/auth.routes'
import { usersRoutes } from '@/routes/users.routes'
import { listsRouter } from '@/routes/lists.routes'

const app = express()

app.use(express.json())
app.use(helmet())

app.get('/', (req, res) => {
  res.status(200).json({message: 'Rocket Tasks'})
})

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/lists', listsRouter)

export default app