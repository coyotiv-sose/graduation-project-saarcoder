import { defineStore } from 'pinia'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

export const useListingStore = defineStore('listing', {
  state: () => ({
    listings: [],
    listing: {},
    listingId: null
  }),
  actions: {
    async fetchListings() {
      const response = await axios.get('/listings')
      this.listings = response.data
    },
    async fetchListing(listingId) {
      this.listing = await axios.get(`/listings/${listingId}`)
    },
    async createListing({ name, country, region, place, numOfRooms, numOfBedsInTotal, numOfDoubleBeds }, ownerId) {
      this.listing = await axios.post('/listings', {
        name,
        country,
        region,
        place,
        numOfRooms,
        numOfBedsInTotal,
        numOfDoubleBeds,
        ownerId
      })
      this.listings.push(this.listing)
      this.$set(this.listings, this.listings.length, this.listing)
    },
  },
  getters: {
    getListings() {
      return this.listings
    },
    getListing() {
      return this.listing
    },
    getListingId() {
      return this.listingId
    }
  }
})
