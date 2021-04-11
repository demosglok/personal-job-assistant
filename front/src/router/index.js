import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Requests from "@/views/Requests.vue";
import Request from "@/views/Request.vue";
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
    path: "/request/:id",
    name: 'Request',
    component: Request
  },
  {
    path: "/privacy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: '/_=_', // workaround - fb redirect
    redirect: './',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
