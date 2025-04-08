import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0,
      user: {
        isLoggedIn: false,
        info: null
      }
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setUser(state, userInfo) {
      state.user.isLoggedIn = true
      state.user.info = userInfo
    },
    clearUser(state) {
      state.user.isLoggedIn = false
      state.user.info = null
    }
  },
  actions: {
    login({ commit }, userInfo) {
      // 这里可以添加登录逻辑，例如API调用
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('setUser', userInfo)
          resolve(true)
        }, 500)
      })
    },
    logout({ commit }) {
      // 这里可以添加登出逻辑
      commit('clearUser')
    }
  },
  getters: {
    isLoggedIn: (state) => state.user.isLoggedIn,
    userInfo: (state) => state.user.info
  }
})

export default store 