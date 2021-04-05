<template>
  <div class="wrapper">
    <h1>Account</h1>
    <p>
      Account page for user
    </p>
    <p>Name: {{user.name}}</p>
    <p>Email: {{user.email}}</p>

  </div>
</template>

<script>
export default {
  name: 'Account',
  props: {
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
}
</script>


<style scoped>

</style>
