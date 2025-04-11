import { createSSRApp } from 'vue'
import App from './App.vue'

// 导入tailwindcss样式
import './styles/tailwind.css'

export function createApp() {
  const app = createSSRApp(App)
  
  return {
    app
  }
} 