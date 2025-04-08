import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'

// 导入tailwindcss样式
import './styles/tailwind.css'

export function createApp() {
  const app = createSSRApp(App)
  
  // 使用Vuex
  app.use(store)
  
  return {
    app
  }
} 