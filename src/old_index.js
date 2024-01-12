// go to client-call.js to see axios calls...

const User = require('./models/user')

const ron = new User('Ron', 'Johnson')

ron.createListing('The Green House', 'USA', 'California', 'Olive Beach', 2, 2)

ron.createListing('Blue Hills', 'USA', 'Appalachians', 'Dusty Mills', 4, 5)

ron.createOffer('The Green House', 'Christmas Rental The Small One', '20.12.2023', '17', '28.12.2023', '09', 350)

ron.createOffer('The Green House', 'Spring Rental Small Aptmt', '27.03.2024', '17', '04.03.24', '9', 270)

ron.createOffer(
  'Blue Hills',
  'Spring Rental',
  '01.04.2024',
  '19',
  '08.04.2024',
  '10',
  '575',
  'SF',
  'First spring rental auction at the end of Jan'
)

ron.createOffer('The Green House', 'Spring Rental Big Aptmnt', '27.03.24', '16', '04.03.2024', '10', '470', 'USD')

ron.updateOfferAddAuction('Christmas Rental The Small One', 'Late Fall Auction', '20.09.2023', '15', '15:30')

ron.updateOfferAddAuction('Spring Rental Big Aptmnt', 'Late Fall Auction', '20.09.2023', '16', '16:15')

// ron.updateOfferRemoveAuction('Christmas Rental The Small One')

ron.deleteOffer('Spring Rental')

console.log(
  'you have planned these offers to be included in this auction: ',
  ron.readListingsInAuction('Late Fall Auction')
)

// ron.deleteListing('Blue Hills')

ron.updateListingName('The Green House', 'Velvet Blue')

ron.updateListingOwner('Velvet Blue', 'Middleton')

ron.updateRemainingListingProps('Velvet Blue', '3', '0', '1', '1', '1', '1', '0', '0', '1', '0', '1', '0', '0', '1')

ron.updateRemainingListingProps('Blue Hills', '3', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', '1', '1')

ron.updateOfferChangePrice('Spring Rental Big Aptmnt', 300)

console.log(ron)
