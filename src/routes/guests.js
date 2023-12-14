const express = require('express')
const Guest = require('../guest')

const router = express.Router()

/* GET guests listing. */
router.get('/', (req, res) => {
  res.send([{ name: 'Tiny Tim' }, { name: 'The GobbledyWook' }, { name: 'Chuck Norris' }])
})

/* Create a new guest */
router.post('/', (req, res) => {
  const guest = new Guest(req.body.name)
  res.send(guest)
})

module.exports = router
