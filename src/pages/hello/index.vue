<template>
  <view class="container">
    <view class="logo">
      <text class="logo-text">Logo</text>
    </view>
    <view class="title">
      <text>Hello World!</text>
    </view>
    <view class="subtitle">
      <text>油菜籽成分检测系统</text>
    </view>
    <view class="content">
      <text class="description">这是一个简单的示例页面</text>
      <button class="btn" @tap="showMessage">点击我</button>
      <text class="hint" v-if="showHint">{{ hintMessage }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showHint: false,
      hintMessage: '欢迎使用油菜籽成分检测系统！'
    }
  },
  onLoad() {
    console.log('Hello World 页面加载完成')
  },
  methods: {
    showMessage() {
      this.showHint = !this.showHint
      
      if (this.showHint) {
        uni.showToast({
          title: '欢迎使用!',
          icon: 'success'
        })
      }
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0f2e0;
  border-radius: 50%;
}

.logo-text {
  font-size: 40rpx;
  font-weight: bold;
  color: #4CAF50;
}

.title {
  margin-bottom: 20rpx;
}

.title text {
  font-size: 50rpx;
  font-weight: bold;
  color: #4CAF50;
}

.subtitle {
  margin-bottom: 60rpx;
}

.subtitle text {
  font-size: 36rpx;
  color: #333;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.description {
  font-size: 30rpx;
  color: #666;
  margin-bottom: 40rpx;
  text-align: center;
}

.btn {
  width: 80%;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #4CAF50;
  color: white;
  font-size: 32rpx;
  border-radius: 8rpx;
  margin-bottom: 30rpx;
}

.hint {
  font-size: 28rpx;
  color: #4CAF50;
  margin-top: 30rpx;
  text-align: center;
}
</style> 