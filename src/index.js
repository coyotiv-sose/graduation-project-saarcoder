const axios = require('axios')
const User = require('./models/user')

// fetch guests from a localhost server endpoint at route different route, 'guests' with axios, with a Promise (but no async function as of now)
// This brings in the raw data (an object array) from the get method defined at that other route, to log it into the console
// axios.get('http://localhost:3000/guests').then(res => console.log(res.data))

// create a new guest through HTTP API with axios
async function main() {
  await axios.post('http://localhost:3000/guests', { name: 'Gianni' })

  await axios.post('http://localhost:3000/guests', { name: 'Tosh' })

  const allGuests = await axios.get('http://localhost:3000/guests')
  console.log('List of all guests', allGuests.data)
}
main()

const ron = new User('Ron', 'Johnson')
ron.createListing('The Green House', 'Olive Beach, California')
// This has listings as [Circular *1], does it need to async/await? No, the listing object held inside the user's listing array itself has the user object as a property, which itself has the user's listings array.
// Therefore, the listing objects should not include the owner as an object, but just as a name, and the list arrays in the user should not contain the full objects (listings, offers, auctions), but just names or ids
console.log(ron.listings)
