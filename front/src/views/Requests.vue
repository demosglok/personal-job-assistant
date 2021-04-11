<template>
  <div class="wrapper">
    <h1>Список запросов</h1>

    <p>Name: {{user.name}}</p>
    <p>Email: {{user.email}}</p>

  </div>
</template>

<script>
export default {
  name: 'Requests',
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
}
</script>


<style scoped>

</style>
