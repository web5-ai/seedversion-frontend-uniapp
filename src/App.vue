<template>
  <view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      isNavigating: false // 用于防止重复导航
    }
  },

  onLaunch: function() {
    // App 启动时执行一次登录检查
    this.checkLogin();
  },

  methods: {
    checkLogin() {
      try {
        // 如果正在导航中，直接返回
        if (this.isNavigating) {
          return;
        }

        const token = uni.getStorageSync('token');
        const pages = getCurrentPages();
        const currentPage = pages[0]?.route || '';
        
        // 如果没有token且不在登录页，跳转到登录页
        if (!token && currentPage !== 'pages/login/index') {
          this.isNavigating = true;
          
          uni.reLaunch({
            url: '/pages/login/index',
            complete: () => {
              // 导航完成后重置状态
              setTimeout(() => {
                this.isNavigating = false;
              }, 1000);
            }
          });
        }
      } catch (e) {
        console.error('检查登录状态失败:', e);
        if (!this.isNavigating) {
          this.isNavigating = true;
          
          uni.reLaunch({
            url: '/pages/login/index',
            complete: () => {
              setTimeout(() => {
                this.isNavigating = false;
              }, 1000);
            }
          });
        }
      }
    }
  }
}
</script>

<style>
@import './styles/theme.css';
@import './styles/tailwind.css';

/* 全局样式 */
page {
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

view {
  box-sizing: border-box;
}

/* 重置一些基础样式 */
view, scroll-view, swiper, swiper-item, cover-view, cover-image, text, icon, rich-text,
progress, button, checkbox, form, input, label, radio, slider, switch, textarea, navigator,
audio, camera, image, video {
  box-sizing: border-box;
}

/* 按钮的默认样式 */
button {
  margin: 0;
  padding: 0;
  line-height: 1;
  background-color: transparent;
}

button::after {
  border: none;
}

/* 安全区适配 */
.safe-area-inset-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-inset-top {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

/* 动画效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style> 
