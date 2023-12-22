const axios = require('axios').default

axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  const merle = await axios.post('/users', { firstName: 'Merle', lastName: 'Johannsen' })
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
  axios.get('/users/dynamic/merle').then(res => console.log('new listing:', res.data[0].place))
  axios.get('/users/dynamic/merle').then(res => console.log('new listing:', res.data[1].place))
  axios.post('/users/newOffer/merle', {
    listing: 'The Green House',
    offerName: 'Christmas Rental The Small One',
    startString: '20.12.2023',
    checkIn: '17',
    endString: '28.12.2023',
    checkOut: '09',
    price: 350,
  })
  axios.get('/users/newOffer/merle').then(res => console.log('new offer: ', res.data[0].offerName))
  axios.post('/users/newOffer/merle', {
    listing: 'The Green House',
    offerName: 'Spring Rental Small Aptmt',
    startString: '27.03.2024',
    checkIn: '17',
    endString: '04.03.24',
    checkOut: '09',
    price: 270,
  })
  axios.get('/users/newOffer/merle').then(res => console.log('new offer: ', res.data[1].offerName))
  axios.post('/users/newOffer/merle', {
    listing: 'Blue Hills',
    offerName: 'Spring Rental',
    startString: '01.04.2024',
    checkIn: '19',
    endString: '08.04.2024',
    checkOut: '10',
    price: 575,
    currency: 'SF',
  })
  axios
    .get('/users/newOffer/merle')
    .then(res => console.log('new offer: ', res.data[2].offerName, '- currency is set to:', res.data[2].currency))
  axios.post('/users/newOffer/merle', {
    listing: 'The Green House',
    offerName: 'Spring Rental Big Aptmnt',
    startString: '27.03.24',
    checkIn: '16',
    endString: '04.03.2024',
    checkOut: '10',
    price: 470,
    currency: 'USD',
  })
  axios
    .get('/users/newOffer/merle')
    .then(res => console.log('new offer: ', res.data[3].offerName, '- currency is set to:', res.data[3].currency))
}
main()