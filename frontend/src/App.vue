<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthenticationStore } from '@/stores/authentication'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    RouterLink,
    RouterView
  },
  computed: {
    ...mapState(useAuthenticationStore, ['user'])
  },
  methods: {
    ...mapActions(useAuthenticationStore, ['fetchUser']),
  },
  async mounted() {
    await this.fetchUser()
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="user" to="/account">Your listings</RouterLink>
        <RouterLink v-if="!user" to="/login">Already a user?</RouterLink>
        <RouterLink v-if="!user" to="/register"> Register</RouterLink>
        <RouterLink v-if="user" to="/logout">Logout</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

</template>

<style scoped>
header {
  display: block;
  line-height: 1.5;
  max-height: 100vh;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}


@media (min-width: 1024px) {
  header {
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
./stores/authentication
