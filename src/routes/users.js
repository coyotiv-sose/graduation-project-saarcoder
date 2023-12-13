const express = require('express')

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res) => {
  res.send([{ name: 'John' }, { name: 'Josh' }])
})

module.exports = router
