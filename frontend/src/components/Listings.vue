<script>
import { useListingStore } from '@/stores/listing'
import { mapState, mapActions } from 'pinia'
export default {
  async created() {
    const store = useListingStore()
    await store.fetchListings()
  },
  data() {
    return {
      header: 'Your local listings:',
      staticListings: [
        {
          id: 1,
          title: 'Cozy apartment in the city center',
          description: 'This is a cozy apartment in the city center. It has a great view and is close to all amenities.',
          price: 100,
          location: 'City center',
        },
        {
          id: 2,
          title: 'Spacious house with a garden',
          description: 'This is a spacious house with a garden. It is perfect for families and has a great view.',
          price: 200,
          location: 'Suburbs',
        }
      ],
    }
  },
  computed: {
    ...mapState(useListingStore, ['listings']),
  },
  methods: {
    ...mapActions(useListingStore, ['fetchListings', 'createListing', 'updateListingName', 'updateListingOwner', 'updateRemainingListingProps','deleteListing']),
  },
}
</script>
<template>
    <h2>{{ header }}</h2>
    <ul>
      <li v-for="single in staticListings" :key="single.id">{{ single.title }} in {{ single.location }}, price/night: {{ single.price }} €</li>
    </ul>
    <h2>Your global listings:</h2>
    <ul>
      <li v-for="listing in listings" :key="listing._id">{{ listing.name }} in {{ listing.place }}, rooms: {{ listing.numOfRooms }}</li>
    </ul>
</template>
