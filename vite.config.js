import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [
    uni(),
  ],
  // 添加别名
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // 打包配置
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // CSS预处理器配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/uni.scss";'
      }
    }
  },
  // 开发服务器配置
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
	proxy: {
		'/api':{
			target: 'http://youcaihua-api.harmony-dev.com/',
			changeOrigin: true,	
		}
		
	}
  }
}); 
