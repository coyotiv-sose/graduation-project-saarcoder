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
    <a @click.prevent="logoutRedirect" href="logout">Logout</a>
  </div>
</template>
<style scoped></style>
