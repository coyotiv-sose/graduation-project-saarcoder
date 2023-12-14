const axios = require('axios')

// fetch guests with axios
axios.get('http://localhost:3000/guests').then(response => console.log(response.data))
