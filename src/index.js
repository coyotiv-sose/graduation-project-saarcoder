const axios = require('axios')

console.log('still nothing inside')

// fetch guests from a localhost server endpoint at route 'guests' with axios
axios.get('http://localhost:4000/guests').then(res => console.log(res.data))
