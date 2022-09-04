export default {
  namespaced: true,
  state: {
    screenHeight: 0,
    screenWidth: 0
  },
  getters: {},
  mutations: {
    getsceen(state, clientHeight, clientWidth) {
      state.screenHeight = clientHeight
      state.screenWidth = clientWidth
      if (state.screenWidth < 1000) {
        state.isCollapse = true
      } else {
        state.isCollapse = false
      }
    }
  },
  actions: {},
  modules: {}
}
