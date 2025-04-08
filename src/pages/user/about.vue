<template>
  <view class="page-container">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="back-btn" @click="goBack">
        <image src="/static/icons/back.svg" class="back-icon"></image>
      </view>
      <view class="header-title">关于应用</view>
    </view>

    <!-- 内容区域 -->
    <view class="content-container">
      <!-- 应用 Logo 部分 -->
      <view class="logo-section">
        <view class="logo-box">
          <image src="/static/logo.png" mode="aspectFit" class="logo-image"></image>
        </view>
        <view class="app-title">油菜籽成分检测系统</view>
        <view class="app-version">版本: 1.0.0</view>
      </view>
      
      <!-- 应用简介 -->
      <view class="info-section">
        <view class="info-title">应用简介：</view>
        <view class="info-content">本应用基于深度学习技术，通过图像识别快速分析油菜籽的主要成分含量，帮助农业工作者和食品加工企业评估油菜籽品质。</view>
      </view>
      
      <!-- 开发团队 -->
      <view class="info-section">
        <view class="info-title">开发团队</view>
        <view class="info-content">技术支持: XX科技有限公司</view>
        <view class="info-content">联系邮箱: support@example.com</view>
      </view>
      
      <!-- 底部导航链接 -->
      <view class="nav-links">
        <navigator url="/pages/terms/user" class="nav-item" hover-class="none">
          <text class="nav-text">用户协议</text>
          <view class="nav-arrow">
            <image src="/static/icons/arrow-right.svg" mode="aspectFit" class="arrow-icon"></image>
          </view>
        </navigator>
        
        <navigator url="/pages/terms/privacy" class="nav-item" hover-class="none">
          <text class="nav-text">隐私政策</text>
          <view class="nav-arrow">
            <image src="/static/icons/arrow-right.svg" mode="aspectFit" class="arrow-icon"></image>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    goBack() {
      uni.navigateBack();
    }
  }
}
</script>

<style>
.page-container {
  min-height: 100vh;
  background-color: var(--bg-page);
  display: flex;
  flex-direction: column;
}

.page-header {
  background-color: var(--primary-color);
  padding: 20px;
  color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-btn {
  position: absolute;
  left: 15px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  width: 24px;
  height: 24px;
}

.header-title {
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.content-container {
  flex: 1;
  padding: 0;
  background-color: var(--bg-page);
}

/* Logo 部分样式 */
.logo-section {
  background-color: #fff;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.logo-box {
  width: 80px;
  height: 80px;
  background-color: #f0f0f0;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.logo-image {
  width: 60px;
  height: 60px;
}

.app-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.app-version {
  font-size: 14px;
  color: var(--text-secondary);
}

/* 信息部分样式 */
.info-section {
  background-color: #fff;
  padding: 15px 20px;
  margin-bottom: 10px;
}

.info-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.info-content {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 5px;
}

/* 导航链接样式 */
.nav-links {
  background-color: #fff;
}

.nav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f5f5f5;
}

.nav-text {
  font-size: 15px;
  color: var(--text-primary);
}

.nav-arrow {
  width: 16px;
  height: 16px;
}

.arrow-icon {
  width: 100%;
  height: 100%;
}
</style> 