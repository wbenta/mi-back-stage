import Vue from 'vue'
import Vuex from 'vuex'
import screen from '@/store/screen.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    screen
  }
})
export default store
