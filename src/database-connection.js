const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => console.log('connected to MongoDB'))

const Cat = mongoose.model('Cat', { name: String })

const kitty = new Cat({ name: 'Mr. Bobbs' })
kitty.save().then(() => console.log('growl'))
