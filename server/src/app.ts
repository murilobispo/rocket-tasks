import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Rocket Tasks')
})

export default app