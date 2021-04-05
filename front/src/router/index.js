import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Account from "@/views/Account.vue";
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/privacy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
