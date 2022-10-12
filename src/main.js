import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/public.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.cc = (res) => {
  console.log(res)
  if (res.status === 1) {
    return Vue.prototype.$message.error(res.message)
  } else if (res.status === 0) {
    return Vue.prototype.$message.success(res.message)
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
