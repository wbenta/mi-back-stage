import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index.vue'
import login from '@/views/login.vue'
import register from '@/views/register.vue'
import miHeadNav from '@/components/config/miheadnav.vue'
import miTopNav from '@/components/config/micate.vue'
import swiper from '@/components/config/swiperConfig.vue'
import goodsupload from '@/components/config/goodsUpload.vue'
import fool from '@/components/config/fool.vue'
import productinforlist from '@/components/goodsInforlist.vue'
import recycle from '@/components/config/recycle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/recycle',
    component: recycle
  },
  {
    path: '/index',
    component: Index,
    redirect: '/index/mitopnav',
    children: [
      {
        path: '/index/mitopnav',
        component: miHeadNav
      },
      {
        path: '/index/micate',
        component: miTopNav
      },
      {
        path: '/index/swiperconfig',
        component: swiper
      },
      {
        path: '/index/goodsupload',
        component: goodsupload
      },
      {
        path: '/index/fool',
        component: fool
      },
      {
        path: '/index/productinforlist',
        component: productinforlist
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const pathArr = []
  // eslint-disable-next-line array-callback-return
  routes.map((item, i) => {
    if (i > 2) {
      pathArr.push(item.path)
      if (item.children) {
        // eslint-disable-next-line array-callback-return
        item.children.map((item2, i) => {
          pathArr.push(item2.path)
        })
      }
    }
  })
  // 判断是否需要登录权限
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    // 判断是否已经登录
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
