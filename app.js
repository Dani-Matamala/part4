const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./routes/blogs')
const cors = require('cors')
const mongoose = require('mongoose')

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

logger.info('connecting to', MONGODB_URI)

mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blog', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app