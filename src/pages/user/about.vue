<template>
  <view class="page-container">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="back-btn" @click="goBack">
        <image src="/static/icons/back.svg" class="back-icon"></image>
      </view>
      <view class="header-title">关于我们</view>
    </view>

    <!-- 关于我们内容 -->
    <scroll-view class="content" scroll-y>
      <view class="section">
        <view class="title">油菜籽成分检测系统</view>
        <view class="subtitle">专业、快捷、精准的检测解决方案</view>
        
        <view class="logo-container">
          <image src="/static/logo.png" class="logo" mode="aspectFit"></image>
        </view>
        
        <view class="paragraph">
          <view class="paragraph-title">系统简介</view>
          <view class="paragraph-content">
            油菜籽成分检测系统是一款专业的农业技术应用，致力于为农业生产者提供快速、准确的油菜籽成分分析服务。本系统利用先进的图像识别技术和人工智能算法，通过简单的拍照即可完成油菜籽的成分分析，帮助用户更好地了解油菜籽品质，为种植和收购决策提供科学依据。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">核心功能</view>
          <view class="paragraph-content">
            • 一键拍照识别：简单操作，快速上传<br>
            • 精准成分分析：多维度分析油菜籽成分<br>
            • 智能报告生成：直观展示检测结果<br>
            • 历史记录查询：随时查看历史检测数据
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">技术优势</view>
          <view class="paragraph-content">
            • 先进的图像识别算法<br>
            • 精确的成分分析模型<br>
            • 便捷的移动端应用<br>
            • 安全的数据存储方案
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">团队介绍</view>
          <view class="paragraph-content">
            我们的团队由农业专家、算法工程师和软件开发人员组成，拥有丰富的行业经验和技术实力。团队成员致力于将先进技术应用于农业领域，为农业生产者提供专业、高效的技术支持。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">发展历程</view>
          <view class="paragraph-content">
            • 2022年：项目立项，开始技术研发<br>
            • 2023年：完成核心算法开发，进行内部测试<br>
            • 2024年：系统正式上线，持续优化功能
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">联系我们</view>
          <view class="paragraph-content">
            邮箱：contact@example.com<br>
            电话：400-123-4567<br>
            地址：xx省xx市xx区xx路xx号
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">版本信息</view>
          <view class="paragraph-content">
            当前版本：v1.0.0<br>
            更新日期：2024年4月10日
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

.logo-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.logo {
  width: 120px;
  height: 120px;
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