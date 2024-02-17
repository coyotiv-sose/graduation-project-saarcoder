<script>
import { useAuthenticationStore } from '../stores/authentication'
import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState(useAuthenticationStore, ['user']),
  },
  methods: {
    ...mapActions(useAuthenticationStore, ['login']),
    async loginAction() {
      await this.login(this.email, this.password)
      this.$router.push('/account')
    },
  }
}
</script>

<template>
  <div class="center">
    Please enter your username and password
  </div>
  <form v-on:submit.prevent>
    <input type="text" placeholder="E-Mail" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <button type="submit" class="btn btn-success btn-sm" @click="loginAction()">Login</button>
    <span>Not a user yet? </span>
    <RouterLink class="routerLink" to="/register">Register</RouterLink>
  </form>
</template>

<style lang="scss" scoped>
.center {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  input {
    margin-bottom: .25rem;
  }
  button {
    margin: .5rem 0;
  }
}
</style>
