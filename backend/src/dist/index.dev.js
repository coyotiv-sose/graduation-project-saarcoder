"use strict";

var axios = require('axios');

console.log('still nothing inside'); // fetch guests from a localhost server endpoint at route 'guests' with axios

/* axios.get('http://localhost:4000/guests').then(res => console.log(res.data)) */
// create a guest with axios

axios.post('http://localhost:4000/guests', {
  name: 'Gianni'
}).then(function (response) {
  console.log(response.data);
})["catch"](function (e) {
  return console.log(e.message);
});