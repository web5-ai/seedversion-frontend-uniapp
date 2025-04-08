import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      // 用户信息
      user: {
        isLoggedIn: false,
        userId: '',
        nickname: '',
        phone: '',
        avatar: '/static/images/avatar-default.svg'
      },
      // 应用配置
      appConfig: {
        version: '1.0.0',
        serverBaseUrl: 'https://api.example.com'
      }
    }
  },
  mutations: {
    // 设置用户信息
    setUser(state, userInfo) {
      state.user = {
        ...state.user,
        ...userInfo,
        isLoggedIn: true
      }
    },
    // 清除用户信息（登出）
    clearUser(state) {
      state.user = {
        isLoggedIn: false,
        userId: '',
        nickname: '',
        phone: '',
        avatar: '/static/images/avatar-default.svg'
      }
    },
    // 更新应用配置
    updateAppConfig(state, config) {
      state.appConfig = {
        ...state.appConfig,
        ...config
      }
    }
  },
  actions: {
    // 登录操作
    login({ commit }, { phoneNumber, verifyCode }) {
      return new Promise((resolve, reject) => {
        // TODO: 实际项目中应调用API
        setTimeout(() => {
          const userInfo = {
            userId: 'user_' + Date.now(),
            nickname: '用户' + phoneNumber.substring(7),
            phone: phoneNumber
          }
          
          commit('setUser', userInfo)
          resolve(userInfo)
        }, 1000)
      })
    },
    
    // 登出操作
    logout({ commit }) {
      return new Promise((resolve) => {
        // TODO: 实际项目中应调用API
        setTimeout(() => {
          commit('clearUser')
          resolve()
        }, 500)
      })
    },
    
    // 获取用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve) => {
        // TODO: 实际项目中应调用API
        const token = uni.getStorageSync('token')
        
        if (token) {
          setTimeout(() => {
            const userInfo = {
              userId: 'user_12345',
              nickname: '示例用户',
              phone: '13800138000'
            }
            commit('setUser', userInfo)
            resolve(userInfo)
          }, 500)
        } else {
          resolve(null)
        }
      })
    }
  },
  getters: {
    isLoggedIn: (state) => state.user.isLoggedIn,
    userInfo: (state) => state.user.info
  }
})

export default store 