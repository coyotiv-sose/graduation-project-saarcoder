const express = require('express')
const Guest = require('../guest')

const router = express.Router()

/* GET guests listing. */
router.get('/', (req, res) => {
  res.send([{ name: 'Tiny Tim' }, { name: 'The GobbledyWook' }, { name: 'Chuck Norris' }])
})

/* Create a new guest */
// Setting up the application to handle POST requests to the guests endpoint from the client
router.post('/', (req, res) => {
  // this works, but does not actually create a new user:
  // res.send({ name: req.body.name })

  // creating the new guest with the value obtained from the request:
  const guest = new Guest(req.body.name)
  res.send(guest.name)
})

module.exports = router
