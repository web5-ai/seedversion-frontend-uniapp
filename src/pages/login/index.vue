<template>
  <view class="login-container">
    <view class="login-page">
      <!-- Logo和标题区域 -->
      <view class="logo-area">
        <view class="logo"></view>
        <text class="app-title">油菜籽成分检测App</text>
      </view>
      
      <!-- 表单区域 -->
      <view class="form-area">
        <!-- 手机号输入框 -->
        <form-input
          v-model="phone"
          type="number"
          placeholder="请输入手机号"
          :error="phoneError"
          error-message="请输入正确的手机号"
          aria-label="手机号输入框"
          @input="validatePhone"
          maxlength="11"
        />
        
        <!-- 验证码输入区域 -->
        <view class="verify-code-area">
          <form-input
            class="verify-code-input"
            v-model="verifyCode"
            type="number"
            placeholder="请输入验证码"
            :error="codeError"
            error-message="请输入6位验证码"
            aria-label="验证码输入框"
            @input="validateCode"
            maxlength="6"
          />
          <code-button 
            :disabled="!isPhoneValid"
            :cooldown="cooldown"
            @click="getVerifyCode"
          />
        </view>
        
        <!-- 登录按钮 -->
        <view class="button-wrapper">
          <common-button 
            :loading="isSubmitting"
            :disabled="!canSubmit"
            @click="handleLogin"
          >登录/注册</common-button>
        </view>
      </view>
      
      <!-- 协议文本 -->
      <view class="agreement-wrapper">
        <agreement-text
          @user-agreement="viewTerms('user')"
          @privacy-agreement="viewTerms('privacy')"
        />
      </view>
    </view>
  </view>
</template>

<script>
import FormInput from '../../components/form/FormInput.vue';
import CodeButton from '../../components/form/CodeButton.vue';
import CommonButton from '../../components/common/Button.vue';
import AgreementText from '../../components/common/AgreementText.vue';

// 防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function() {
    if (timer) clearTimeout(timer);
    const context = this;
    const args = arguments;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export default {
  components: {
    FormInput,
    CodeButton,
    CommonButton,
    AgreementText
  },
  data() {
    return {
      phone: '',
      verifyCode: '',
      cooldown: 0,
      timer: null,
      phoneError: false,
      codeError: false,
      isSubmitting: false
    }
  },
  computed: {
    isPhoneValid() {
      return this.phone && /^1\d{10}$/.test(this.phone);
    },
    isCodeValid() {
      return this.verifyCode && this.verifyCode.length === 6;
    },
    canSubmit() {
      return this.isPhoneValid && this.isCodeValid && !this.isSubmitting;
    }
  },
  methods: {
    validatePhone() {
      // 清除之前的错误
      this.phoneError = false;
      
      // 如果已输入内容但格式不正确，显示错误
      if (this.phone && !this.isPhoneValid) {
        this.phoneError = true;
      }
    },
    validateCode() {
      // 清除之前的错误
      this.codeError = false;
      
      // 如果已输入内容但不是6位，显示错误
      if (this.verifyCode && !this.isCodeValid) {
        this.codeError = true;
      }
    },
    getVerifyCode: debounce(function() {
      // 如果手机号无效，不执行操作
      if (!this.isPhoneValid) {
        this.phoneError = true;
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        });
        return;
      }
      
      // 开始倒计时
      this.cooldown = 60;
      this.timer = setInterval(() => {
        this.cooldown--;
        if (this.cooldown <= 0) {
          clearInterval(this.timer);
        }
      }, 1000);
      
      // TODO: 调用发送验证码的API
      uni.showToast({
        title: '验证码已发送',
        icon: 'success'
      });
    }, 300),
    handleLogin: debounce(function() {
      // 验证输入
      this.validatePhone();
      this.validateCode();
      
      if (!this.isPhoneValid) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        });
        return;
      }
      
      if (!this.isCodeValid) {
        uni.showToast({
          title: '请输入6位验证码',
          icon: 'none'
        });
        return;
      }
      
      // 防止重复提交
      if (this.isSubmitting) return;
      
      // 设置提交状态
      this.isSubmitting = true;
      
      // TODO: 调用登录API
      setTimeout(() => {
        const userInfo = {
          userId: 'user_' + Date.now(),
          phone: this.phone,
          nickname: '用户' + this.phone.substring(7)
        };
        
        // 模拟登录成功
        this.$store.commit('setUser', userInfo);
        uni.setStorageSync('token', 'mock_token_' + Date.now());
        
        uni.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,
          success: () => {
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/hello/index'
              });
            }, 1500);
          }
        });
        
        // 重置提交状态
        this.isSubmitting = false;
      }, 1000); // 模拟网络请求延迟
    }, 300),
    viewTerms(type) {
      // 查看协议
      const title = type === 'user' ? '用户协议' : '隐私政策';
      uni.showModal({
        title: title,
        content: `这是${title}内容，实际项目中应该跳转到协议页面或者展示完整协议内容。`,
        showCancel: false
      });
    }
  },
  onUnload() {
    // 页面卸载时清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>

<style>
.login-container {
  width: 100%;
  min-height: 100vh;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
}

.login-page {
  width: 100%;
  max-width: 375px; /* 限制最大宽度，模拟手机屏幕 */
  min-height: 100vh;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
}

/* Logo 区域 */
.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  margin-bottom: 60px;
  width: 100%;
}

.logo {
  width: 96px;
  height: 96px;
  background-color: #CCCCCC;
  border-radius: 20px;
  margin-bottom: 16px;
}

.app-title {
  font-size: 22px;
  font-weight: 500;
  color: #333333;
  text-align: center;
}

/* 表单区域 */
.form-area {
  width: 100%;
}

.verify-code-area {
  display: flex;
  width: 100%;
  margin-bottom: 12px;
}

.verify-code-input {
  flex: 1;
  margin-right: 12px;
}

.button-wrapper {
  margin-top: 8px;
}

/* 协议区域 */
.agreement-wrapper {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
}
</style> 