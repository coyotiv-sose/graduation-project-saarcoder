const axios = require('axios')
const User = require('./models/user')
const Listing = require('./models/listing')
const Offer = require('./models/offer')
const Auction = require('./models/auction')

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
console.log(ron.listings)
ron.createOffer('The Green House', '20.12.2023', '17', '28.12.2023', '09', 350)
console.log(ron.offers)
// Test timestamp
/* let [startDay, startMonth, startYear] = '20.12.2023'.split('.')
console.log(startDay, startMonth, startYear)
const startDate = new Date(startYear, (startMonth -= 1), startDay, '17')
console.log(startDate) */
