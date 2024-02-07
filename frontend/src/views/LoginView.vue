<script>
import axios from 'axios'
import { authenticationStore } from '../stores/authentication'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      username: '',
      password: '',
      status: ''
    }
  },
  computed: {
    ...mapState(authenticationStore, ['user']),
  },
  methods: {
    ...mapActions(authenticationStore, ['login']),
    doLogin() {
      this.login()
      this.$router.push('/about')
    }
  }
}
</script>

<template>
  <form v-on:submit.prevent>
    <input type="text" name="username" placeholder="Username" v-model="username" required />
    <input type="password" name="password" placeholder="Password" v-model="password" required />
    <button type="submit" @click="doLogin">Login</button>
    <label>{{ status }}</label>
    <label v-if="user">Are you allowed to see this?</label>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
}
</style>
