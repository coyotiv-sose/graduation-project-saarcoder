"use strict";

var express = require('express');

var Guest = require('../guest');

var router = express.Router();
/* GET guests listing. */

router.get('/', function (req, res) {
  res.send([{
    name: 'Tiny Tim'
  }, {
    name: 'The GobbledyWook'
  }, {
    name: 'Chuck Norris'
  }]);
});
/* Create a new guest */

router.post('/', function (req, res) {
  var guest = new Guest(req.body.name);
  res.send(guest);
});
module.exports = router;