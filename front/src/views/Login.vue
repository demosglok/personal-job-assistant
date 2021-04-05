<template>
  <div class="wrapper">
    <h1>Login</h1>
    <p>
      Login with one of oauth providers
    </p>
    <div>
      <button @click="facebook">Facebook</button>
      <button @click="google">Google</button>
      <button @click="github">GitHub</button>
      <button @click="linkedin">LinkedIn</button>
    </div>

  </div>
</template>

<script>
import config from "@/config";

export default {
  name: 'Landing',
  props: {
  },
  methods: {
    facebook() {
      window.location = config.authUrls.fb;
    },
    google() {
      window.location = config.authUrls.google;
    },
    github() {
      window.location = config.authUrls.github;
    },
    linkedin() {
      window.location = config.authUrls.linkedin;
    }
  }
}
</script>


<style scoped>

</style>
