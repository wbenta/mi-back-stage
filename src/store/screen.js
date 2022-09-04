export default {
  namespaced: true,
  state: {
    screenHeight: 0,
    screenWidth: 0
  },
  mutations: {
    getscreen(state, clientHeight, clientWidth) {
      state.screenHeight = clientHeight
      state.screenWidth = clientWidth
      console.log(state.screenHeight)
      // fn = () => {}
    }
  },
  getters: {},
  actions: {
    increment(context, clientHeight, clientWidth) {
      console.log('incre')
      context.commit('getscreen', clientHeight, clientWidth)
    }
  }
}
