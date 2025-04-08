<template>
  <view class="agreement-area">
    <text class="agreement-text">{{ prefix }} </text>
    <text class="agreement-link" @click="onUserAgreement">《{{ userAgreementText }}》</text>
    <text class="agreement-text"> {{ conjunction }} </text>
    <text class="agreement-link" @click="onPrivacyAgreement">《{{ privacyAgreementText }}》</text>
  </view>
</template>

<script>
export default {
  name: 'AgreementText',
  props: {
    // 前缀文本
    prefix: {
      type: String,
      default: '登录即表示同意'
    },
    // 连接词
    conjunction: {
      type: String,
      default: '和'
    },
    // 用户协议文本
    userAgreementText: {
      type: String,
      default: '用户协议'
    },
    // 隐私协议文本
    privacyAgreementText: {
      type: String,
      default: '隐私政策'
    }
  },
  methods: {
    onUserAgreement() {
      this.$emit('user-agreement');
    },
    onPrivacyAgreement() {
      this.$emit('privacy-agreement');
    }
  }
}
</script>

<style scoped>
.agreement-area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

.agreement-text {
  font-size: 12px;
  color: #999999;
}

.agreement-link {
  font-size: 12px;
  color: #3B7AEB;
}
</style> 