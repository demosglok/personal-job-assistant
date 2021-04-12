import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Vacancies from "@/views/Vacancies.vue";
import Request from "@/views/Request.vue";
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import DeleteInstructions from '@/views/DeleteInstructions.vue'

import store from '@/store';

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
    path: "/myprofile",
    name: "MyProfile",
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: "/vacancies",
    name: "Vacancies",
    component: Vacancies,
    meta: { requiresAuth: true }
  },
  {
    path: "/request/:id",
    name: 'Request',
    component: Request
  },
  {
    path: "/privacypolicy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/deleteinstructions",
    name: "DeleteInstructions",
    component: DeleteInstructions,
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

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    if ( store.getters.loggedin) {
        next()
    } else { //not logged in redirect to home page.
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
