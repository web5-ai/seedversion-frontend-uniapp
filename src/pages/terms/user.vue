<template>
  <view class="page-container">

    <!-- 协议内容 -->
    <scroll-view class="content" scroll-y>
      <view class="section">
        <view class="title">油菜籽成分检测系统用户协议</view>
        <view class="subtitle">最后更新时间：2024年4月8日</view>
        
        <view class="paragraph">
          <view class="paragraph-title">1. 协议范围</view>
          <view class="paragraph-content">
            本协议是您与油菜籽成分检测系统之间关于使用本系统服务所订立的协议。请您在使用本系统前，仔细阅读并了解本协议。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">2. 服务内容</view>
          <view class="paragraph-content">
            2.1 本系统提供油菜籽成分检测服务，包括但不限于：<br>
            - 拍照上传油菜籽照片<br>
            - 分析油菜籽成分<br>
            - 生成检测报告<br>
            - 历史记录查询<br>
            2.2 系统会不断优化和更新服务内容，具体以实际提供的服务为准。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">3. 用户义务</view>
          <view class="paragraph-content">
            3.1 您承诺：<br>
            - 提供真实、准确的油菜籽照片<br>
            - 遵守相关法律法规<br>
            - 不进行任何违法或不当行为<br>
            3.2 您理解并同意，系统仅提供检测服务，不对检测结果承担法律责任。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">4. 知识产权</view>
          <view class="paragraph-content">
            4.1 本系统的所有内容，包括但不限于文字、图片、软件、算法等，均受知识产权法保护。<br>
            4.2 未经授权，您不得复制、修改、传播或用于其他商业用途。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">5. 免责声明</view>
          <view class="paragraph-content">
            5.1 系统不对检测结果的准确性做任何保证。<br>
            5.2 因不可抗力或技术原因导致的服务中断，系统不承担责任。<br>
            5.3 您应自行承担使用本系统可能产生的风险。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">6. 协议修改</view>
          <view class="paragraph-content">
            6.1 系统有权随时修改本协议。<br>
            6.2 修改后的协议将在系统内公布。<br>
            6.3 继续使用本系统即表示您同意修改后的协议。
          </view>
        </view>

        <view class="paragraph">
          <view class="paragraph-title">7. 法律适用</view>
          <view class="paragraph-content">
            本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。
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