import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Feed from '../views/Feed.vue'
import Profile from '../views/Profile.vue'
import Discover from '../views/Discover.vue'
import UserProfile from '../views/UserProfile'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/discover',
    name: 'Discover',
    component: Discover,
  },
  {
    path: '/user/:userId',
    name: 'UserProfile',
    component: UserProfile,
  }
]

const router = new VueRouter({
  routes
})

export default router
