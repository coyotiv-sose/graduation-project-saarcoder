const express = require('express')

const router = express.Router()

/* GET guests listing. */
router.get('/', (req, res) => {
  res.render('guests', {
    manager: {
      name: 'Mr. Boombastic',
    },
    guests: [{ name: 'Tiny Tim' }, { name: 'The GobbledyWook' }, { name: 'Chuck Norris' }],
  })
})

module.exports = router
