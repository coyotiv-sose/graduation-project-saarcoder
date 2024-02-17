<script>
import { useAuthenticationStore } from '@/stores/authentication'
import { mapActions } from 'pinia'

export default {
  methods: {
    ...mapActions(useAuthenticationStore, ['logout']),
    async logoutRedirect() {
      await this.logout()
      this.$router.push('/login')
    }
  }
}
</script>
<template>
  <div>
  <RouterLink @click="logoutRedirect" to="/logout">Logout</RouterLink>
  </div>
</template>
