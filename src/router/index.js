import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import SignIn from "@/components/SignIn.vue";
import Registration from "@/components/Registration.vue";
import Friends from "@/components/Friends.vue";
import Chats from "@/components/Chats.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: SignIn
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends
  },
  {
    path: '/chats',
    name: 'Chats',
    component: Chats
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
