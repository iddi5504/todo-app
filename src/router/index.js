import Vue from 'vue'
import VueRouter from 'vue-router'
import signUp from '../views/signUp.vue'
import todo from '../views/todo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'signUp',
    component: signUp
  },
  {
    path: '/todo',
    name: 'todo',
   component:todo
  }
]

const router = new VueRouter({
  routes
})

export default router
