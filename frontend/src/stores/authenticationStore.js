import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

export const authenticationStore = defineStore('authentication', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      this.user = (await axios.get('/authentication/session')).data
      console.log('User:', await axios.get('/authentication/session'))
    },
    async login(username, password) {
      this.user = await axios.post(
        '/authentication/session',
        {
          email: username,
          password: password
        }
      )
    }

  }
})
