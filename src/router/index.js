import Vue from 'vue'
import VueRouter from 'vue-router'
import signupView from '../views/signupView.vue'
import todoView from '../views/todoView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'signup',
    component: signupView
  },
  {
    path: '/todo',
    name: 'todo',
   component:todoView
  }
]

const router = new VueRouter({
  routes
})

export default router
