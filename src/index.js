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
ron.createListing('Blue Hills', 'Appalachian Creek, Dusty Mills')

// getting date and time values for the timestamp from separate user input fields:
ron.createOffer('The Green House', 'Christmas Rental', '20.12.2023', '17', '28.12.2023', '09', 350)
ron.createOffer('The Green House', 'Spring Rental Small Aptmt', '27.03.2024', '17', '04.03.24', '9', 270)
ron.createOffer(
  'Blue Hills',
  'Spring Rental',
  '01.04.2024',
  '19',
  '08.04.2024',
  '10',
  575,
  'SF',
  'First spring rental auction at the end of Jan'
)
ron.createOffer(
  'The Green House',
  'Spring Rental Big Aptmnt',
  '27.03.24',
  '16',
  '04.03.2024',
  '10',
  470,
  'Winter Auction'
)
// YY vs YYYY inputs: Integer value representing the year. Values from 0 to 99 map to the years 1900 to 1999. All other values are the actual year.
// ron.createAuction('The Green House', 'Spring offer', '04.08.24')
// ron.createAuction('Blue Hills', 'Spring offer', '04.08.2024')
// ron.removeAuction('The Green House', 'Spring offer')
// ron.createAuction('The Green House', 'Summer special', '20.06.2024')

// ron.lookupListingsInAuction('Spring offer')
ron.updateOfferForAuction('Christmas Rental', 'Late Fall Auction')
// ron.updateOfferRemoveAuction('Christmas Rental')
console.log(ron)
