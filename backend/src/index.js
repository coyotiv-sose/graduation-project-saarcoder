const axios = require('axios').default

axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  /*   await axios.get('/db')
   */
  const newUser = await axios.post('/authentication/newUser', {
    email: 'john@doe.com',
    nickName: 'JohnnyX',
    password: '1234',
  })
  /*   await axios.post('/users', { firstName: 'Trish', lastName: 'Hendricks' })
  const pete = await axios.post('/users', { firstName: 'Pete', lastName: 'Bartholomew' })
  console.log('Pete:', pete.data)

  const merle = await axios.post('/users', { firstName: 'Merle', lastName: 'Biggs' })
  console.log('Merle:', merle.data)

  // get all users
  const allUsers = await axios.get('/users')
  console.log('List of users:', allUsers.data)

  // get one user
  const merleUser = await axios.get(`/users/${merle.data._id}`)
  console.log('Merle:', merleUser.data)
  // storing in variable to log out the response
  // changing route to dynamic user id (needs underscore)
  const merleListing = await axios.post('/users/listings', {
    name: 'The Green House',
    country: 'USA',
    region: 'California',
    place: 'Olive Beach',
    numOfRooms: 2,
    numOfBedsInTotal: 2,
    ownerId: merle.data._id,
  })
  console.log('merleListing:', merleListing.data)

  await axios.post('/users/listings', {
    name: 'Blue Hills',
    country: 'USA',
    region: 'Appalachians',
    place: 'Dusty Mills',
    numOfRooms: 4,
    numOfBedsInTotal: 5,
    ownerId: merle.data._id,
  })

  await axios
    .get(`/users/listings/${merle.data._id}`)
    .then(res => console.log("Merle's first new listing is in:", res.data[0].place))
    .catch(err => console.log(err.data.message ? err.data.message : err))

  await axios
    .get(`/users/listings/${merle.data._id}`)
    .then(res => console.log("Merle's second new listing is in:", res.data[1].place))

  await axios.post('/users/offers', {
    listing: 'The Green House',
    offerName: 'Christmas Rental The Small One',
    startString: '20.12.2023',
    checkIn: '17',
    endString: '28.12.2023',
    checkOut: '09',
    price: 350,
    ownerId: merle.data._id,
  })

  await axios.get(`/users/offers/${merle.data._id}`).then(res => console.log('new offer: ', res.data[0].offerName))

  await axios.post('/users/offers', {
    listing: 'The Green House',
    offerName: 'Spring Rental Small Aptmt',
    startString: '27.03.2024',
    checkIn: '17',
    endString: '04.03.24',
    checkOut: '09',
    price: 270,
    ownerId: merle.data._id,
  })

  await axios.get(`/users/offers/${merle.data._id}`).then(res => console.log('new offer: ', res.data[1].offerName))

  await axios.post('/users/offers', {
    listing: 'Blue Hills',
    offerName: 'Spring Rental',
    startString: '01.04.2024',
    checkIn: '19',
    endString: '08.04.2024',
    checkOut: '10',
    price: 575,
    currency: 'SF',
    ownerId: merle.data._id,
  })

  await axios
    .get(`/users/offers/${merle.data._id}`)
    .then(res => console.log('new offer: ', res.data[2].offerName, '- currency is set to:', res.data[2].currency))

  await axios.post('/users/offers', {
    listing: 'The Green House',
    offerName: 'Spring Rental Big Aptmnt',
    startString: '27.03.24',
    checkIn: '16',
    endString: '04.03.2024',
    checkOut: '10',
    price: 470,
    currency: 'USD',
    ownerId: merle.data._id,
  })

  await axios
    .get(`/users/offers/${merle.data._id}`)
    .then(res => console.log('new offer: ', res.data[3].offerName, '- currency is set to:', res.data[3].currency))

  await axios.get(`/users/${merle.data._id}/listings`).then(res => console.log(res.data.map(listing => listing.place)))

  await axios.put(`/users/${merle.data._id}/offers/Late Fall Auction`, {
    offer: 'Christmas Rental The Small One',
    auction: 'Late Fall Auction',
    startDate: '20.09.2023',
    startTime: '15',
    endTime: '15:30',
  })

  await axios
    .get(`/users/${merle.data._id}/offers`)
    .then(res => console.log('new auction:', res.data.find(el => el.auction === 'Late Fall Auction').auction))

  await axios.put(`/users/${merle.data._id}/offers/Late Fall Auction`, {
    offer: 'Spring Rental Big Aptmnt',
    auction: 'Late Fall Auction',
    startDate: '20.09.2023',
    startTime: '16',
    endTime: '16:15',
  })

  // filter offers that are set up for an auction:
  await axios.get(`/users/${merle.data._id}/offers`).then(res =>
    console.log(
      'new auction:',
      res.data.filter(el => el.auction)
    )
  )

  await axios.delete(`/users/${merle.data._id}/offers/Christmas Rental The Small One`)

  await axios.get(`/users/${merle.data._id}/offers`).then(res => console.log("Merle's updated offers:", res.data))

  await axios
    .get(`/users/${merle.data._id}/offers/auction/Late Fall Auction`)
    .then(res => console.log('you have planned these offers to be included in this auction:', res.data))
 */
  console.log('new User is : ', newUser.data)
}

main().catch(err => console.log(err))
