const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('./models/user')

require('dotenv').config()
require('./database-connection')

console.log(process.env.MONGODB_CONNECTION_STRING)

const { constants } = require('crypto')
const indexRouter = require('./routes/index')
const guestsRouter = require('./routes/guests')
const usersRouter = require('./routes/users')
const listingsRouter = require('./routes/listings')
const offersRouter = require('./routes/offers')

const app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

let connectionPromise = mongoose.connection.asPromise().then(connection => (connectionPromise = connection.getClient()))
app.use(cors())
app.use(
  session({
    secret: 'secretPW', // process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.ENVIRONMENT === 'production', // setting to true for production environment
      httpOnly: process.env.ENVIRONMENT === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 * 3, // 3 weeks
    },
    store: MongoStore.create({
      clientPromise: connectionPromise,
      // mongoUrl: process.env.MONGODB_CONNECTION_STRING,
      stringify: false, //  transform cookie string to an object
    }),
  })
)

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// intercept any http request to the background
app.use((req, res, next) => {
  const numberOfVisits = req.session.numberOfVisits || 0
  req.session.numberOfVisits = numberOfVisits + 1
  req.session.history = req.session.history || []
  req.session.history.push({
    timestamp: new Date(),
    url: req.url,
    ip: req.ip,
  })
  console.log('session:', req.session)
  next()
})
app.use(passport.initialize())
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
