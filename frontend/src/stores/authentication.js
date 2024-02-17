import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      this.user = await axios.get('/authentication/session')
    },
    async login(email, password) {
      this.user = await axios.post(
        '/authentication/session',
        {
          email,
          password
        }
      )
    },
    async logout() {
      await axios.delete('/authentication/session')
      this.user = null
    },
    async register(email, nickName, password) {
      await axios.post('/authentication/newUser',
        {
          email: email,
          password: password,
          nickName: nickName
        },
      )
    }
  }
})
