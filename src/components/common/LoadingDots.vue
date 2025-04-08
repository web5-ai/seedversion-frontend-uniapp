<template>
  <view class="loading-container">
    <view class="loading-icon">
      <text class="loading-dot"></text>
      <text class="loading-dot"></text>
      <text class="loading-dot"></text>
    </view>
    <text v-if="showText" class="loading-text">{{ text }}</text>
  </view>
</template>

<script>
export default {
  name: 'LoadingDots',
  props: {
    /**
     * 加载提示文本
     */
    text: {
      type: String,
      default: '加载中...'
    },
    /**
     * 是否显示文本
     */
    showText: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-icon {
  display: flex;
  margin-bottom: 15px;
}

.loading-dot {
  width: 12px;
  height: 12px;
  background-color: #ffffff;
  border-radius: 50%;
  margin: 0 5px;
  animation: loading 1.4s infinite ease-in-out both;
}

.loading-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dot:nth-child(2) {
  animation-delay: -0.16s;
}

.loading-text {
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
}

@keyframes loading {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style> 