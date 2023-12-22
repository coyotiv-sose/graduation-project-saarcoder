const axios = require('axios').default

axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  await axios.post('/users', { firstName: 'Merle', lastName: 'Johannsen' })
  axios.get('/users').then(response => {
    console.log(response)
  })
  await axios.get('/users/staticOffers').then(res => console.log('static offer list: ', res.data))
  await axios.get('/users/staticListings').then(res => console.log('static listing: ', res.data[0].toUpperCase()))
  await axios.get('/users/staticListing')
  await axios.post('/users/dynamic/merle', {
    name: 'The Green House',
    country: 'USA',
    region: 'California',
    place: 'Olive Beach',
    numOfRooms: 2,
    numOfBedsInTotal: 2,
  })
  await axios.post('/users/dynamic/merle', {
    name: 'Blue Hills',
    country: 'USA',
    region: 'Appalachians',
    place: 'Dusty Mills',
    numOfRooms: 4,
    numOfBedsInTotal: 5,
  })
  await axios.get('/users/dynamic/merle').then(res => console.log('new listing:', res.data[0].place))
  await axios.get('/users/dynamic/merle').then(res => console.log('new listing:', res.data[1].place))
  await axios.post('/users/newOffer/merle', {
    listing: 'The Green House',
    offerName: 'Christmas Rental The Small One',
    startString: '20.12.2023',
    checkIn: '17',
    endString: '28.12.2023',
    checkOut: '09',
    price: 350,
  })
  await axios.get('/users/newOffer/merle').then(res => console.log('new offer: ', res.data[0].offerName))
  await axios.post('/users/newOffer/merle', {
    listing: 'The Green House',
    offerName: 'Spring Rental Small Aptmt',
    startString: '27.03.2024',
    checkIn: '17',
    endString: '04.03.24',
    checkOut: '09',
    price: 270,
  })
  await axios.get('/users/newOffer/merle').then(res => console.log('new offer: ', res.data[1].offerName))
  await axios.post('/users/newOffer/merle', {
    listing: 'Blue Hills',
    offerName: 'Spring Rental',
    startString: '01.04.2024',
    checkIn: '19',
    endString: '08.04.2024',
    checkOut: '10',
    price: 575,
    currency: 'SF',
  })
  await axios
    .get('/users/newOffer/merle')
    .then(res => console.log('new offer: ', res.data[2].offerName, '- currency is set to:', res.data[2].currency))
  await axios.post('/users/newOffer/merle', {
    listing: 'The Green House',
    offerName: 'Spring Rental Big Aptmnt',
    startString: '27.03.24',
    checkIn: '16',
    endString: '04.03.2024',
    checkOut: '10',
    price: 470,
    currency: 'USD',
  })
  await axios
    .get('/users/newOffer/merle')
    .then(res => console.log('new offer: ', res.data[3].offerName, '- currency is set to:', res.data[3].currency))
  await axios.get('/users/Merle/listings').then(res => console.log(res.data.map(listing => listing.place)))
  await axios.put('/users/Merle/updateAddAuctionToOffer', {
    offer: 'Christmas Rental The Small One',
    auction: 'Late Fall Auction',
    startDate: '20.09.2023',
    startTime: '15',
    endTime: '15:30',
  })
  await axios
    .get('/users/Merle/offers')
    .then(res => console.log('new auction:', res.data.find(el => el.auction === 'Late Fall Auction').auction))
}
main()
