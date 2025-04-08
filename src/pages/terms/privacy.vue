<template>
  <view class="page-container">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="back-btn" @click="goBack">
        <image src="/static/icons/back.svg" class="back-icon"></image>
      </view>
      <view class="header-title">隐私政策</view>
    </view>

    <!-- 隐私政策内容 -->
    <scroll-view class="content" scroll-y>
      <view class="section">
        <view class="title">油菜籽成分检测系统隐私政策</view>
        <view class="subtitle">最后更新时间：2024年4月8日</view>
        
        <view class="paragraph">
          <view class="paragraph-title">1. 信息收集</view>
          <view class="paragraph-content">
            1.1 我们收集的信息包括：<br>
            - 您提供的油菜籽照片<br>
            - 设备信息（如设备型号、操作系统版本）<br>
            - 使用记录（如检测历史、操作日志）<br>
            1.2 我们不会收集您的个人身份信息，除非您主动提供。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">2. 信息使用</view>
          <view class="paragraph-content">
            2.1 我们使用收集的信息用于：<br>
            - 提供检测服务<br>
            - 优化系统性能<br>
            - 改进用户体验<br>
            2.2 我们不会将您的信息用于其他商业用途。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">3. 信息存储</view>
          <view class="paragraph-content">
            3.1 您的数据存储在安全的服务器上。<br>
            3.2 我们采取合理的安全措施保护您的信息。<br>
            3.3 您可以随时删除您的历史记录。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">4. 信息共享</view>
          <view class="paragraph-content">
            4.1 我们不会与第三方共享您的信息。<br>
            4.2 除非法律要求，我们不会披露您的信息。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">5. 您的权利</view>
          <view class="paragraph-content">
            5.1 您可以随时查看您的历史记录。<br>
            5.2 您可以删除您的历史记录。<br>
            5.3 您可以随时停止使用本系统。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">6. 政策更新</view>
          <view class="paragraph-content">
            6.1 我们可能随时更新本隐私政策。<br>
            6.2 更新后的政策将在系统内公布。<br>
            6.3 继续使用本系统即表示您同意更新后的政策。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">7. 联系我们</view>
          <view class="paragraph-content">
            如果您对本隐私政策有任何疑问，请通过以下方式联系我们：<br>
            邮箱：support@example.com
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  methods: {
    goBack() {
      uni.navigateBack()
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
  color: #fff;
}

.header-title {
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.content {
  flex: 1;
  padding: 20px;
}

.section {
  background-color: var(--bg-card);
  border-radius: var(--border-radius-md);
  padding: 20px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 20px;
}

.paragraph {
  margin-bottom: 20px;
}

.paragraph-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.paragraph-content {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}
</style> 