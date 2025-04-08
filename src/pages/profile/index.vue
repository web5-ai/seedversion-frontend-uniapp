<template>
  <view class="page-container">
    <!-- 顶部背景和用户信息 -->
    <view class="profile-header">
      <view class="user-info">
        <image class="avatar" src="/static/images/avatar-default.png" mode="aspectFill"></image>
        <view class="user-details">
          <text class="username">{{ userInfo.nickname || '未登录' }}</text>
          <text v-if="userInfo.isLoggedIn" class="user-id">ID: {{ userInfo.userId }}</text>
          <view v-else class="login-btn" @click="goToLogin">
            <text>点击登录/注册</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 功能选项列表 -->
    <view class="function-list">
      <!-- 我的检测 -->
      <view class="section">
        <view class="section-title">我的检测</view>
        <view class="grid-menu">
          <view class="grid-item" @click="navigateTo('/pages/history/index')">
            <view class="grid-icon history-icon">📊</view>
            <text class="grid-text">历史记录</text>
          </view>
          <view class="grid-item" @click="navigateTo('/pages/favorite/index')">
            <view class="grid-icon favorite-icon">⭐</view>
            <text class="grid-text">收藏</text>
          </view>
          <view class="grid-item" @click="navigateTo('/pages/report/index')">
            <view class="grid-icon report-icon">📝</view>
            <text class="grid-text">检测报告</text>
          </view>
        </view>
      </view>
      
      <!-- 账户与安全 -->
      <view class="section">
        <view class="section-title">账户与安全</view>
        <view class="menu-list">
          <view class="menu-item" @click="navigateTo('/pages/settings/account')">
            <view class="menu-item-left">
              <text class="menu-icon account-icon">👤</text>
              <text class="menu-text">账户信息</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/settings/security')">
            <view class="menu-item-left">
              <text class="menu-icon security-icon">🔒</text>
              <text class="menu-text">账户安全</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/settings/notification')">
            <view class="menu-item-left">
              <text class="menu-icon notification-icon">🔔</text>
              <text class="menu-text">消息通知</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
        </view>
      </view>
      
      <!-- 帮助与反馈 -->
      <view class="section">
        <view class="section-title">帮助与反馈</view>
        <view class="menu-list">
          <view class="menu-item" @click="navigateTo('/pages/help/faq')">
            <view class="menu-item-left">
              <text class="menu-icon help-icon">❓</text>
              <text class="menu-text">常见问题</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/help/feedback')">
            <view class="menu-item-left">
              <text class="menu-icon feedback-icon">📮</text>
              <text class="menu-text">意见反馈</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/terms/user')">
            <view class="menu-item-left">
              <text class="menu-icon terms-icon">📃</text>
              <text class="menu-text">用户协议</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/terms/privacy')">
            <view class="menu-item-left">
              <text class="menu-icon privacy-icon">🔐</text>
              <text class="menu-text">隐私政策</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/about/index')">
            <view class="menu-item-left">
              <text class="menu-icon about-icon">ℹ️</text>
              <text class="menu-text">关于我们</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
        </view>
      </view>
      
      <!-- 登出按钮 -->
      <view class="logout-section" v-if="userInfo.isLoggedIn">
        <button class="logout-button" @click="logout">退出登录</button>
      </view>
      
      <!-- 版本信息 -->
      <view class="version-info">
        <text>版本 v1.0.0</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 用户信息
      userInfo: {
        isLoggedIn: true, // 调试时设为true，实际应根据登录状态判断
        nickname: '张三',
        userId: '12345678',
        avatar: '/static/images/avatar-default.png'
      }
    }
  },
  onLoad() {
    // 加载用户信息
    this.loadUserInfo();
  },
  methods: {
    // 加载用户信息
    loadUserInfo() {
      // TODO: 从本地存储或API获取用户信息
      // 这里使用模拟数据
    },
    
    // 跳转到登录页
    goToLogin() {
      uni.navigateTo({
        url: '/pages/login/index'
      });
    },
    
    // 跳转到指定页面
    navigateTo(url) {
      uni.navigateTo({
        url: url
      });
    },
    
    // 退出登录
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // TODO: 清除登录状态和用户信息
            this.userInfo.isLoggedIn = false;
            this.userInfo.nickname = '';
            this.userInfo.userId = '';
            
            uni.showToast({
              title: '已退出登录',
              icon: 'success'
            });
          }
        }
      });
    }
  }
}
</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 50px; /* 为底部TabBar预留空间 */
}

/* 头部个人信息区域 */
.profile-header {
  background-color: #4CAF50;
  padding: 40px 20px 30px;
  color: #fff;
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background-color: #FFF;
}

.user-details {
  margin-left: 15px;
}

.username {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
  display: block;
}

.user-id {
  font-size: 12px;
  opacity: 0.8;
}

.login-btn {
  margin-top: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 100px;
  font-size: 12px;
}

/* 功能选项列表 */
.function-list {
  flex: 1;
  padding: 15px;
}

.section {
  background: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.section-title {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  padding: 15px 15px 10px;
  border-bottom: 1px solid #f0f0f0;
}

/* 网格菜单 */
.grid-menu {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
}

.grid-item {
  width: 33.333%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
}

.grid-icon {
  margin-bottom: 8px;
  font-size: 24px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
  background-color: #f5f7fa;
}

.grid-text {
  font-size: 12px;
  color: #666;
}

/* 列表菜单 */
.menu-list {
  padding: 0 15px;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.menu-list .menu-item:last-child {
  border-bottom: none;
}

.menu-item-left {
  display: flex;
  align-items: center;
}

.menu-icon {
  font-size: 16px;
  margin-right: 10px;
}

.menu-text {
  font-size: 14px;
  color: #333;
}

.menu-arrow {
  color: #ccc;
  font-size: 18px;
}

/* 退出登录按钮 */
.logout-section {
  margin: 20px 0;
}

.logout-button {
  background-color: #fff;
  color: #ff4d4f;
  border: none;
  font-size: 16px;
  height: 44px;
  line-height: 44px;
  border-radius: 10px;
}

/* 版本信息 */
.version-info {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 20px;
  padding-bottom: 20px;
}
</style> 