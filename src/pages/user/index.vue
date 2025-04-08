<template>
  <view class="page-container">
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="avatar-container">
        <image class="avatar" src="/static/default-avatar.png" mode="aspectFill"></image>
      </view>
      <view class="user-info">
        <view class="username">用户名</view>
        <view class="user-id">ID: 123456</view>
      </view>
    </view>

    <!-- 导航列表 -->
    <view class="nav-list">
      <view class="nav-item" @click="navigateTo('/pages/user/history')">
        <view class="nav-icon">
          <image src="/static/icons/history.svg" mode="aspectFit"></image>
        </view>
        <view class="nav-text">历史记录</view>
        <view class="nav-arrow">
          <image src="/static/icons/arrow-right.svg" mode="aspectFit"></image>
        </view>
      </view>

      <view class="nav-item" @click="navigateTo('/pages/user/about')">
        <view class="nav-icon">
          <image src="/static/icons/about.svg" mode="aspectFit"></image>
        </view>
        <view class="nav-text">关于我们</view>
        <view class="nav-arrow">
          <image src="/static/icons/arrow-right.svg" mode="aspectFit"></image>
        </view>
      </view>

      <view class="nav-item" @click="navigateTo('/pages/terms/user')">
        <view class="nav-icon">
          <image src="/static/icons/agreement.svg" mode="aspectFit"></image>
        </view>
        <view class="nav-text">用户协议</view>
        <view class="nav-arrow">
          <image src="/static/icons/arrow-right.svg" mode="aspectFit"></image>
        </view>
      </view>

      <view class="nav-item" @click="navigateTo('/pages/terms/privacy')">
        <view class="nav-icon">
          <image src="/static/icons/privacy.svg" mode="aspectFit"></image>
        </view>
        <view class="nav-text">隐私政策</view>
        <view class="nav-arrow">
          <image src="/static/icons/arrow-right.svg" mode="aspectFit"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    navigateTo(url) {
      uni.navigateTo({
        url: url
      })
    }
  }
}
</script>

<style>
.page-container {
  min-height: 100vh;
  background-color: var(--bg-page);
  padding: 20px;
}

.user-card {
  background-color: var(--bg-card);
  border-radius: var(--border-radius-md);
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}

.avatar {
  width: 100%;
  height: 100%;
}

.user-info {
  flex: 1;
}

.username {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.user-id {
  font-size: 14px;
  color: var(--text-secondary);
}

.nav-list {
  background-color: var(--bg-card);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid var(--border-color);
}

.nav-item:last-child {
  border-bottom: none;
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-right: 15px;
}

.nav-icon image {
  width: 100%;
  height: 100%;
}

.nav-text {
  flex: 1;
  font-size: 16px;
  color: var(--text-primary);
}

.nav-arrow {
  width: 16px;
  height: 16px;
}

.nav-arrow image {
  width: 100%;
  height: 100%;
}
</style> 