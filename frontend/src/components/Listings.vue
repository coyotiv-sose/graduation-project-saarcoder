<script>
import { useAuthenticationStore } from '../stores/authentication'
import { mapState } from 'pinia'
export default {
  data() {
    return {
      header: 'Your listings',
      listings: [
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
        },
        {
          id: 3,
          title: 'Modern apartment with a view',
          description: 'This is a modern apartment with a great view. It is close to all amenities and has a great view.',
          price: 150,
          location: 'City center',
        },
      ],
    }
  },
  computed: {
    ...mapState(useAuthenticationStore, ['user']),
  },
}
</script>
<template>
    <h2>{{ header }}</h2>
    <ul>
      <li v-for="listing in listings" :key="listing.id">{{ listing.title }} in {{ listing.location }}, price/night: {{ listing.price }} €</li>
    </ul>
</template>
