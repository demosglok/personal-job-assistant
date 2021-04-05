<template>
  <div>Navigation:
    <span v-if="loggedin"><a href="#" @click="logout">logout</a></span>
    <span v-else><router-link to="/login">login</router-link></span>
  </div>
  <router-view />
</template>

<script>


export default {
  name: 'App',
  computed: {
    loggedin() {
      return this.$store.getters.loggedin;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => this.$router.push('/'));
    }
  },
  mounted() {
    this.$store
      .dispatch("loadUser")
      .then(() => this.$router.push('/account'))
      .catch(ex => console.log("App failed to load user", ex.message));
  }

}
</script>

<style scoped>

</style>
