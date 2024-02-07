<script>
import axios from 'axios'

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      username: '',
      password: '',
      status: '',
      user: {}
    }
  },
  methods: {
    async login() {
      const newUser = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/authentication/session',
        {
          email: this.username,
          password: this.password
        },
        {
          withCredentials: true
        }
      )
      if (newUser) {
        this.user = newUser.data
        this.status = 'success'
        this.$router.push('/about')
      } else {
        this.user = {}
        this.status = 'failed'
      }
      console.log(newUser.data)
    }
  }
}
</script>

<template>
  <form v-on:submit.prevent>
    <input type="text" name="username" placeholder="Username" v-model="username" required />
    <input type="password" name="password" placeholder="Password" v-model="password" required />
    <button type="submit" @click="login">Login</button>
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
