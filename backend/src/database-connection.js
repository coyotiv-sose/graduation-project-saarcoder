const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log(`connected to MongoDB${process.env.MONGODB_CONNECTION_STRING}`))
