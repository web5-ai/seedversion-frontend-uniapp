<template>
  <view>
    <page-head v-if="false"></page-head>
    <view class="content">
      <router-view></router-view>
    </view>
  </view>
</template>

<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
    // 检查登录状态并保存到vuex
    const token = uni.getStorageSync('token');
    if (token) {
      // 如果有token，获取用户信息
      this.getUserInfo();
    }
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  },
  methods: {
    getUserInfo() {
      // 模拟获取用户信息
      const userInfo = {
        username: 'testuser',
        name: '测试用户',
        email: 'test@example.com',
        avatar: '/static/icons/user-avatar.png'
      };
      
      // 将用户信息存储到Vuex
      this.$store.commit('SET_USER_INFO', userInfo);
    }
  }
}
</script>

<style>
/* 全局样式 */
page {
  min-height: 100%;
  display: flex;
}

.content {
  display: flex;
  flex: 1;
  flex-direction: column;
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

/* 自定义颜色变量 */
:root {
  --primary-color: #4CAF50;
  --secondary-color: #FFC107;
  --text-color: #333333;
  --text-color-light: #666666;
  --background-color: #f9fafb;
  --border-color: #e5e7eb;
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

/* 扩展TailwindCSS样式 */
.text-primary {
  color: var(--primary-color);
}
.bg-primary {
  background-color: var(--primary-color);
}
.border-primary {
  border-color: var(--primary-color);
}
.text-secondary {
  color: var(--secondary-color);
}
.bg-secondary {
  background-color: var(--secondary-color);
}
</style> 