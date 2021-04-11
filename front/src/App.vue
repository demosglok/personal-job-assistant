<template>
  <div class="mainwrapper">
  <el-container>
    <el-header>
      <el-menu  mode="horizontal" :router="true">
        <el-menu-item index="/home" >Home</el-menu-item>
        <template v-if="loggedin">
          <el-menu-item index="/profile" >Профиль-анкета</el-menu-item>
          <el-menu-item index="/requests" >Запросы</el-menu-item>
          <el-menu-item index="#"><a href="#" @click="logout">Выйти</a></el-menu-item>

        </template>
        <template v-else>
          <el-menu-item index="login">Login</el-menu-item>
        </template>
      </el-menu>
    </el-header>
    <el-main>
        <router-view />
    </el-main>
    <el-footer>
      <div>Personalised Job Assistant</div>
      <div>Dmytro Selin (c) 2021</div>
    </el-footer>
  </el-container>
</div>

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
      .then(() => this.$store.dispatch("loadProfile"))
      .then(() => {
        if(this.$route.path == '/' || this.$route.path.startsWith('/home')) {
          this.$router.push('/profile')
        }
      })
      .catch(ex => console.log("App failed to load user", ex.message));
  }
}
</script>

<style scoped>
.el-container {
  min-height: 100vh;
}
.el-main {
  height: 100%;
}
.el-footer {
  text-align: center;
}

</style>
<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>
