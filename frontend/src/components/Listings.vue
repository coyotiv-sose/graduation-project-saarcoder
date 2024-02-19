<script>
import { useListingStore } from '@/stores/listing'
import { mapState, mapActions } from 'pinia'
export default {
  async created() {
    await this.fetchListings()
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(useListingStore, ['listings']),
  },
  methods: {
    ...mapActions(useListingStore, ['fetchListings']),
  },
}
</script>
<template>
    <h2>Your listings:</h2>
    <ul>
      <li v-for="listing in listings" :key="listing._id">{{ listing.name }} in {{ listing.place }}, rooms: {{ listing.numOfRooms }}</li>
    </ul>
</template>
