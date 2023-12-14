const axios = require('axios')

// fetch guests from a localhost server endpoint at route different route, 'guests' with axios, with a Promise (but no async function as of now)
// This brings in the raw data (an object array) from the get method defined at that other route, to log it into the console
axios.get('http://localhost:3000/guests').then(res => console.log(res.data))

// create a new guest through HTTP API with axios
async function main() {
  const guest = await axios
    .post('http://localhost:3000/guests', { name: 'Gianni' })
    .then(response => {
      console.log(response.data)
    })
    .catch(e => console.log(e.message))
}
main()
