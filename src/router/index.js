import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index.vue'
import miTopNav from '@/components/menus/mitopnav.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index,
    redirect: '/index/mitopnav',
    children: [
      {
        path: '/index/mitopnav',
        component: miTopNav
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
