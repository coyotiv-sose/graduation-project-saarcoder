const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./database-connection')

console.log(process.env.MONGODB_CONNECTION_STRING)

const indexRouter = require('./routes/index')
const guestsRouter = require('./routes/guests')
const usersRouter = require('./routes/users')
const listingsRouter = require('./routes/listings')
const offersRouter = require('./routes/offers')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/guests', guestsRouter)
app.use('/users', usersRouter)
app.use('/listings', listingsRouter)
app.use('/offers', offersRouter)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
console.log('오늘은 좋은 날입니다')
module.exports = app
