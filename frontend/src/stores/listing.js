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
      try {
        const response = await axios.post('/listings', {
          name,
          country,
          region,
          place,
          numOfRooms,
          numOfBedsInTotal,
          numOfDoubleBeds,
          ownerId
        })

        if (response.data) {
          this.listing = response.data
          this.listings.push(response.data)
        } else {
          console.error('listing creation failed')
        }
      } catch (error) {
        console.error('error creating listing', error)
      }
    },
    async updateListingName(name, newName) {
      this.listing = await axios.put(`/listings/${name}`, {
        newName
      })
    },
    async updateListingOwner(name, newOwner) {
      this.listing = await axios.put(`/listings/${name}`, {
        newOwner
      })
    },
    async updateRemainingListingProps({
      listingName,
      cribOrCotAvailable,
      kitchen,
      kettle,
      fridge,
      freezer,
      stove,
      oven,
      highChairAvailable,
      washingMachine,
      linen,
      underfloorHeating,
      laminateFlooring,
      warmWaterAvailable,
      tv,
      dishwasher,
      microwave,
      coffeeMachine,
      toaster,
      dryer,
      shower,
      bathtub,
      hairdryer,
      towels,
      bedLinen,
      iron,
      wifi,
      parking }
    ) {
      this.listing = await axios.put(`/listings/${listingName}`, {
        cribOrCotAvailable,
        kitchen,
        kettle,
        fridge,
        freezer,
        stove,
        oven,
        highChairAvailable,
        washingMachine,
        linen,
        underfloorHeating,
        laminateFlooring,
        warmWaterAvailable,
        tv,
        dishwasher,
        microwave,
        coffeeMachine,
        toaster,
        dryer,
        shower,
        bathtub,
        hairdryer,
        towels,
        bedLinen,
        iron,
        wifi,
        parking,
      })
    },
    async deleteListing(name) {
      this.listing = await axios.delete(`/listings/${name}`)
    }
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
