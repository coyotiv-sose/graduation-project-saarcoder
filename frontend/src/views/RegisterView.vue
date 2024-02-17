<script>
  import axios from 'axios'
  import { useAuthenticationStore } from '../stores/authentication'
  import { mapActions } from 'pinia'

  export default {
    name: 'RegisterView',
    components: {},
    data() {
      return {
        email: '',
        password: '',
        nickName: '',
      }
    },
    methods: {
      ...mapActions(useAuthenticationStore, ['register']),
      async registerReroute() {
        await this.register(this.email, this.nickName, this.password)
        this.$router.push({ name: 'login' })
      },
    }
  }
</script>
<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="registerReroute">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <input type="text" v-model="nickName" placeholder="Your name" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>
