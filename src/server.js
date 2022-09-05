const express = require('express')
const app = express()

const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

const userRouter = require('./routers/users')
const postsRouter = require('./routers/posts')
const commentsRouter = require('./routers/comments')
const categoriesRouter = require('./routers/categories')

app.use('/users', userRouter)

app.use('/users', postsRouter)
// app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)
app.use('/categories', categoriesRouter)


module.exports = app