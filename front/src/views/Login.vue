<template>
  <div class="wrapper">
    <h1>Login</h1>
    <p>
      Залогинься используя один из вариантов
    </p>
    <div>
      <el-button @click="facebook">Facebook</el-button>
      <el-button @click="google">Google</el-button>
      <el-button @click="github">GitHub</el-button>
      <el-button @click="linkedin">LinkedIn</el-button>
    </div>
    <div class="privacypolicy_link">
      Регистрируясь на нашем сайте вы соглашаетесь с политикой о приватных данных <router-link to="/privacypolicy">Privacy Policy</router-link>
    </div>

  </div>
</template>

<script>
import config from "@/config";

export default {
  name: 'Landing',

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
.wrapper {
  margin: auto;
  margin-top: 15%;
  width: 500px;
}
.privacypolicy_link {
  margin-top: 12px;
  font-size:14px;
}
</style>
