const express = require('express')
const parser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(parser.json())
app.use(morgan('dev'))
app.disable('x-powered-by')

const landRoutes = require('./src/routes/land')
app.use('/land', landRoutes)

app.use((req, res, next) => {
  const status = 404
  const error = `Could not ${req.method} ${req.url}`

  next({ status, error })
})

app.use((err, req, res, next) => {
  console.error(err)

  const message = `Internal Server Error.`
  const { status = 500, error = message } = err

  res.status(status).json({ status, error})
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)
