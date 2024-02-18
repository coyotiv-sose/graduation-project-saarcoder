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
      this.listings = await axios.get('/users/listings')
    },
    async fetchListing(listingId) {
      this.listing = await axios.get(`/users/listings/${listingId}`)
    },
    async createListing({ name, country, region, place, numOfRooms, numOfBedsInTotal, numOfDoubleBeds }) {
      this.listing = await axios.post('/users/listings', {
        name,
        country,
        region,
        place,
        numOfRooms,
        numOfBedsInTotal,
        numOfDoubleBeds,
      })
    },
    async updateListingName(name, newName) {
      this.listing = await axios.put(`/users/listings/${name}`, {
        newName
      })
    },
    async updateListingOwner(name, newOwner) {
      this.listing = await axios.put(`/users/listings/${name}`, {
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
      this.listing = await axios.put(`/users/listings/${listingName}`, {
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
