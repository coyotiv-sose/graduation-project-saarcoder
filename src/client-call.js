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
}
main()
