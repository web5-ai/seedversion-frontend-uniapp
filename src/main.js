import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'

// 导入tailwindcss样式
import './styles/tailwind.css'

export function createApp() {
  const app = createSSRApp(App)
  
  // 使用Vuex
  try {
    app.use(store)
  } catch (e) {
    console.error('Vuex 加载失败:', e);
  }
  
  return {
    app
  }
} 