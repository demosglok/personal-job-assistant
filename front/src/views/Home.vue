<template>
  <div class="wrapper">
    <h1>Home page</h1>
    <div>
      <p>
        If Element Plus is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button type="primary">el-button</el-button>
    </div>
    <router-link to="/login">Login and Try our project</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
  }
}
</script>


<style scoped>

</style>
