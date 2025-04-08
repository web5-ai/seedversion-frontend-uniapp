<template>
  <view class="page-container">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="back-btn" @click="goBack">
        <image src="/static/icons/back.svg" class="back-icon"></image>
      </view>
      <view class="header-title">隐私政策</view>
    </view>

    <!-- 协议内容 -->
    <scroll-view class="content" scroll-y>
      <view class="section">
        <view class="title">油菜籽成分检测系统隐私政策</view>
        <view class="subtitle">最后更新时间：2024年4月8日</view>
        
        <view class="paragraph">
          <view class="paragraph-title">1. 引言</view>
          <view class="paragraph-content">
            本隐私政策旨在帮助您了解我们如何收集、使用、存储和分享您的个人信息，以及您享有的相关权利。请您在使用我们的服务前，仔细阅读并了解本隐私政策。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">2. 信息收集</view>
          <view class="paragraph-content">
            2.1 我们收集的信息包括：<br>
            - 您提供的油菜籽照片<br>
            - 检测结果数据<br>
            - 设备信息（如设备型号、操作系统版本等）<br>
            - 使用记录（如检测历史、操作日志等）<br>
            2.2 我们不会收集您的个人身份信息，除非您主动提供。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">3. 信息使用</view>
          <view class="paragraph-content">
            3.1 我们使用收集的信息用于：<br>
            - 提供和改进检测服务<br>
            - 优化用户体验<br>
            - 进行数据分析和研究<br>
            - 确保服务的安全性<br>
            3.2 我们不会将您的信息用于任何商业营销目的。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">4. 信息存储</view>
          <view class="paragraph-content">
            4.1 我们采用安全的技术措施保护您的信息。<br>
            4.2 您的检测数据将存储在安全的服务器上。<br>
            4.3 您可以随时删除您的检测记录。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">5. 信息共享</view>
          <view class="paragraph-content">
            5.1 我们不会向第三方出售或出租您的信息。<br>
            5.2 在以下情况下，我们可能会共享您的信息：<br>
            - 获得您的明确同意<br>
            - 法律法规要求<br>
            - 保护我们的合法权益
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">6. 您的权利</view>
          <view class="paragraph-content">
            6.1 您有权：<br>
            - 访问您的个人信息<br>
            - 更正不准确的信息<br>
            - 删除您的信息<br>
            - 撤回同意<br>
            - 投诉或举报
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">7. 信息安全</view>
          <view class="paragraph-content">
            7.1 我们采取合理的安全措施保护您的信息。<br>
            7.2 我们定期审查和更新安全措施。<br>
            7.3 我们建议您采取适当措施保护您的设备安全。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">8. 政策更新</view>
          <view class="paragraph-content">
            8.1 我们可能会不时更新本隐私政策。<br>
            8.2 更新后的政策将在本系统上公布。<br>
            8.3 继续使用我们的服务即表示您同意更新后的政策。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">9. 联系我们</view>
          <view class="paragraph-content">
            如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：<br>
            邮箱：support@example.com<br>
            电话：400-123-4567
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