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
      this.user = (await axios.get('/authentication/session'))
    },
    async login(username, password) {
      this.user = await axios.post(
        '/authentication/session',
        {
          email: username,
          password: password
        }
      )
    },
    async logout() {
      await axios.delete('/authentication/session')
      this.user = null
    },
    async register(email, nickName, password) {
      const newUser = await axios.post('/authentication/newUser',
        {
          email: email,
          password: password,
          nickName: nickName
        },
      )
    }
  }
})
