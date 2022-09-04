import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index.vue'
import miTopNav from '@/components/menus/mitopnav.vue'
import miHeadNav from '@/components/menus/miheadnav.vue'

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
      },
      {
        path: '/index/miheadnav',
        component: miHeadNav
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
