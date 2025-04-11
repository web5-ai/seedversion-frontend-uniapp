<template>
  <view>
    <!-- 页面内容会自动加载 -->
  </view>
</template>

<script>
export default {
  onLaunch: function() {
    // App 启动时执行，只执行一次
    // 初始化用户状态、检查更新、设置主题等
  },
  onShow: function() {
    // App 从后台进入前台显示时触发
  },
  onHide: function() {
    // App 从前台进入后台时触发
  },
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