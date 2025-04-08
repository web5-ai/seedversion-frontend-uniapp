<template>
  <view class="page-container">
    <!-- 顶部背景和用户信息 -->
    <view class="profile-header">
      <view class="user-info">
        <image class="avatar" src="/static/images/avatar-default.svg" mode="aspectFill" alt="用户头像"></image>
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
          <view class="grid-item" @click="switchToHistoryTab">
            <view class="grid-icon history-icon">
              <image src="/static/icons/history.svg" mode="aspectFit" class="icon-image" alt="历史记录图标"></image>
            </view>
            <text class="grid-text">历史记录</text>
          </view>
          <view class="grid-item" @click="navigateTo('/pages/favorite/index')">
            <view class="grid-icon favorite-icon">
              <image src="/static/icons/favorite.svg" mode="aspectFit" class="icon-image" alt="收藏图标"></image>
            </view>
            <text class="grid-text">收藏</text>
          </view>
          <view class="grid-item" @click="navigateTo('/pages/feedback-list/index')">
            <view class="grid-icon feedback-icon">
              <image src="/static/icons/feedback.svg" mode="aspectFit" class="icon-image" alt="反馈记录图标"></image>
            </view>
            <text class="grid-text">反馈记录</text>
          </view>
        </view>
      </view>
      
      <!-- 账户与安全 -->
      <view class="section">
        <view class="section-title">账户与安全</view>
        <view class="menu-list">
          <view class="menu-item" @click="navigateTo('/pages/settings/account')">
            <view class="menu-item-left">
              <view class="menu-icon">
                <image src="/static/icons/account.svg" mode="aspectFit" class="icon-image" alt="账户信息图标"></image>
              </view>
              <text class="menu-text">账户信息</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/settings/security')">
            <view class="menu-item-left">
              <view class="menu-icon">
                <image src="/static/icons/security.svg" mode="aspectFit" class="icon-image" alt="账户安全图标"></image>
              </view>
              <text class="menu-text">账户安全</text>
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
              <view class="menu-icon">
                <image src="/static/icons/help.svg" mode="aspectFit" class="icon-image" alt="常见问题图标"></image>
              </view>
              <text class="menu-text">常见问题</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/help/feedback')">
            <view class="menu-item-left">
              <view class="menu-icon">
                <image src="/static/icons/feedback.svg" mode="aspectFit" class="icon-image" alt="意见反馈图标"></image>
              </view>
              <text class="menu-text">意见反馈</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/terms/user')">
            <view class="menu-item-left">
              <view class="menu-icon">
                <image src="/static/icons/terms.svg" mode="aspectFit" class="icon-image" alt="用户协议图标"></image>
              </view>
              <text class="menu-text">用户协议</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/terms/privacy')">
            <view class="menu-item-left">
              <view class="menu-icon">
                <image src="/static/icons/privacy.svg" mode="aspectFit" class="icon-image" alt="隐私政策图标"></image>
              </view>
              <text class="menu-text">隐私政策</text>
            </view>
            <text class="menu-arrow">›</text>
          </view>
          <view class="menu-item" @click="showModal('关于我们')">
            <view class="menu-item-left">
              <view class="menu-icon">
                <image src="/static/icons/about.svg" mode="aspectFit" class="icon-image" alt="关于我们图标"></image>
              </view>
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
import IconSvg from '@/components/common/IconSvg.vue';

export default {
  components: {
    IconSvg
  },
  data() {
    return {
      // 用户信息
      userInfo: {
        isLoggedIn: false, // 默认未登录状态
        nickname: '',
        userId: '',
        avatar: '/static/images/avatar-default.svg'
      }
    }
  },
  onShow() {
    // 每次页面显示时检查登录状态
    this.checkLoginStatus();
  },
  onLoad() {
    // 页面加载时检查登录状态
    this.checkLoginStatus();
  },
  methods: {
    // 检查登录状态
    checkLoginStatus() {
      try {
        // 从store获取用户信息
        const storeUser = this.$store?.state?.user;
        const token = uni.getStorageSync('token');
        
        if ((storeUser && storeUser.isLoggedIn) || token) {
          this.loadUserInfo();
        } else {
          // 未登录，跳转到登录页
          console.log('用户未登录，跳转到登录页');
          this.redirectToLogin();
        }
      } catch (e) {
        console.error('检查登录状态失败:', e);
        this.redirectToLogin();
      }
    },
    
    // 重定向到登录页
    redirectToLogin() {
      // 使用重定向而不是普通导航，防止用户通过返回按钮回到未登录的页面
      uni.redirectTo({
        url: '/pages/login/index'
      });
    },
    
    // 加载用户信息
    loadUserInfo() {
      try {
        // 从store获取用户信息
        const storeUser = this.$store?.state?.user;
        if (storeUser && storeUser.isLoggedIn) {
          this.userInfo = {
            isLoggedIn: storeUser.isLoggedIn,
            nickname: storeUser.nickname,
            userId: storeUser.userId,
            avatar: storeUser.avatar || '/static/images/avatar-default.svg'
          };
        } else {
          // 如果store中没有用户信息，尝试从本地存储获取token
          const token = uni.getStorageSync('token');
          if (token) {
            // 有token，可以调用获取用户信息的action
            this.$store.dispatch('getUserInfo').then(userInfo => {
              if (userInfo) {
                this.userInfo = {
                  isLoggedIn: true,
                  nickname: userInfo.nickname,
                  userId: userInfo.userId,
                  avatar: userInfo.avatar || '/static/images/avatar-default.svg'
                };
              } else {
                // 获取用户信息失败，可能token已失效
                this.redirectToLogin();
              }
            }).catch(() => {
              // API调用失败，可能是token无效
              this.redirectToLogin();
            });
          } else {
            // 没有token，跳转到登录页
            this.redirectToLogin();
          }
        }
      } catch (e) {
        console.error('获取用户信息失败:', e);
        this.redirectToLogin();
      }
    },
    
    // 跳转到登录页
    goToLogin() {
      uni.navigateTo({
        url: '/pages/login/index'
      });
    },
    
    // 切换到历史记录Tab
    switchToHistoryTab() {
      uni.switchTab({
        url: '/pages/history/index'
      });
    },
    
    // 跳转到指定页面
    navigateTo(url) {
      // 处理收藏功能（开发中）
      if (url.includes('/pages/favorite/index')) {
        this.showDevelopingFeature('收藏');
        return;
      }
      
      // 其他页面正常跳转
      uni.navigateTo({
        url: url,
        fail: (err) => {
          console.error('页面跳转失败:', err);
          this.showDevelopingFeature('该功能');
        }
      });
    },
    
    // 显示功能开发中的提示
    showDevelopingFeature(featureName) {
      uni.showToast({
        title: `${featureName}功能开发中，敬请期待`,
        icon: 'none',
        duration: 2000
      });
    },
    
    // 显示模态框
    showModal(title) {
      uni.showModal({
        title: title,
        content: `这是${title}内容，实际项目中应该跳转到对应页面或者展示完整内容。`,
        showCancel: false
      });
    },
    
    // 退出登录
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 调用store的登出action
            this.$store.dispatch('logout').then(() => {
              // 清除本地存储的token
              uni.removeStorageSync('token');
              
              // 更新本地用户状态
              this.userInfo = {
                isLoggedIn: false,
                nickname: '',
                userId: '',
                avatar: '/static/images/avatar-default.svg'
              };
              
              // 退出后重定向到登录页
              uni.showToast({
                title: '已退出登录',
                icon: 'success',
                success: () => {
                  // 延迟跳转，让提示消息显示完
                  setTimeout(() => {
                    this.redirectToLogin();
                  }, 1500);
                }
              });
            }).catch(err => {
              console.error('登出失败:', err);
              uni.showToast({
                title: '退出登录失败',
                icon: 'none'
              });
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

.icon-image {
  width: 24px;
  height: 24px;
}
</style> 