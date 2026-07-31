import path from 'node:path'
import express from 'express'
import helmet from 'helmet'
import { apiReference } from '@scalar/express-api-reference'

import { authRoutes } from '@/routes/auth.routes'
import { usersRoutes } from '@/routes/users.routes'
import { listsRouter } from '@/routes/lists.routes'
import { tasksRouter } from '@/routes/tasks.routes'
import { errorHandler } from '@/middlewares/errorHandler'

const app = express()

app.use(express.json())

// Scalar injects an inline initialization script.
// Allow jsDelivr for the UI assets and 'unsafe-inline' for the bootstrap script.
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
      workerSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.scalar.com"]
    }
  }
}))

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Rocket Tasks API',
    version: '1.0.0',
    documentation: '/docs',
  })
})

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/lists', listsRouter)
app.use('/tasks', tasksRouter)

app.get('/openapi.yaml', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'docs', 'openapi.yaml'))
})

app.use('/docs',apiReference({
    url: '/openapi.yaml',
    agent: {
      disabled: true
    },
    defaultHttpClient: {
      targetKey: 'node',
      clientKey: 'axios',
    },
    modelsSectionLabel: 'Schemas',
    showDeveloperTools: 'never',
    metaData: {
      title: 'Rocket Tasks API',
      description:
        'REST API for user authentication, task management, and task list organization.',
      ogTitle: 'Rocket Tasks API',
      ogDescription:
        'Comprehensive API documentation for Rocket Tasks, including authentication, users, lists, and tasks.',
    }
  }),
)

app.use(errorHandler)

export default app