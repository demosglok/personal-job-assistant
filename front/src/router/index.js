import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Requests from "@/views/Requests.vue";
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/home",
    name: "Home2",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/requests",
    name: "Requests",
    component: Requests,
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
