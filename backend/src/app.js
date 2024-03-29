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
const User = require('./models/authUser')

require('dotenv').config()
require('./database-connection')

console.log(process.env.MONGODB_CONNECTION_STRING)

const indexRouter = require('./routes/index')
const guestsRouter = require('./routes/guests')
const usersRouter = require('./routes/users')
const listingsRouter = require('./routes/listings')
const offersRouter = require('./routes/offers')
const authRouter = require('./routes/authentication')

const app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const clientPromise = mongoose.connection.asPromise().then(connection => (connection = connection.getClient()))

app.use(
  cors({
    origin: true, // TODO: update to frontend url
    credentials: true,
  })
)

app.set('trust proxy', 1) // trust first proxy
const sessionMiddleware = session({
  secret: 'SuperSecureSecretNobodyKnows', // is required to enrcypt your session specifically to you like
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified
  saveUninitialized: true,
  cookie: {
    secure: process.env.ENVIRONMENT === 'production', // TODO: set to true when using https
    // httpOnly: process.env.ENVIRONMENT === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7 * 3, // 3 weeks
    sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'strict',
  },
  store: MongoStore.create({
    clientPromise,
    stringify: false,
  }),
})
app.use(sessionMiddleware)

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
app.use(passport.session())
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
app.use('/authentication', authRouter)

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
app.createSocketServer = server => {
  // casting the server object into socket.io object
  const io = require('socket.io')(server, {
    cors: {
      origin: true,
      credentials: true,
    },
    /*     passport: {
      secret: process.env.SESSION_SECRET,
      store: MongoStore.create({
        clientPromise: connectionPromise,
        stringify: false,
      }),
    }, */
  })
  // app.use() only for socket.io
  io.engine.use(sessionMiddleware)
  io.engine.use(passport.session())

  console.log('Server side socket.io is running')
  io.on('connection', socket => {
    console.log('a user connected')

    const socketSession = socket.request.session
    console.log('socket io specific session', socketSession)

    socket.emit('numberOfVisits', socketSession.numberOfVisits)

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}
console.log('app.js is running')
module.exports = app
