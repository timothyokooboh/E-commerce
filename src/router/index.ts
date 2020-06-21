import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store"

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/auth/user/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (Register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },

  {
    path: '/auth/user/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (Login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  
  },

  {
    path: '/auth/user/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (Dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    beforeEnter(to, from, next) {
      if(store.state.userToken !== "") {
        next()
      } else {
        next('/auth/user/login')
      }
    }
  },

]

const router = new VueRouter({
  routes
})

export default router
