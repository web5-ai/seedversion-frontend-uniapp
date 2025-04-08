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
        <view class="input-wrapper">
          <input 
            class="input-field"
            :class="{'input-error': phoneError}"
            type="number" 
            maxlength="11"
            placeholder="请输入手机号" 
            v-model="phone"
            @input="validatePhone"
          />
          <text v-if="phoneError" class="error-text">请输入正确的手机号</text>
        </view>
        
        <!-- 验证码输入区域 -->
        <view class="code-area">
          <view class="input-wrapper flex-1">
            <input 
              class="input-field"
              :class="{'input-error': codeError}"
              type="number" 
              maxlength="6"
              placeholder="请输入验证码" 
              v-model="verifyCode"
              @input="validateCode"
            />
            <text v-if="codeError" class="error-text">请输入6位验证码</text>
          </view>
          <view 
            class="code-button"
            :class="{'btn-disabled': !isPhoneValid || cooldown > 0}"
            @click="getVerifyCode"
          >
            <text>{{ cooldown > 0 ? `${cooldown}秒后重试` : '获取验证码' }}</text>
          </view>
        </view>
        
        <!-- 登录按钮 -->
        <view 
          class="login-button"
          :class="{'button-disabled': !canSubmit}"
          @click="handleLogin"
        >
          <view class="loading-spinner" v-if="isSubmitting"></view>
          <text v-else>登录/注册</text>
        </view>
      </view>
      
      <!-- 协议文本 -->
      <view class="agreement-wrapper">
        <view class="agreement-area">
          <text class="agreement-text">登录即表示同意 </text>
          <text class="agreement-link" @click="viewTerms('user')">《用户协议》</text>
          <text class="agreement-text"> 和 </text>
          <text class="agreement-link" @click="viewTerms('privacy')">《隐私条款》</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
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
    getVerifyCode() {
      // 如果手机号无效或正在倒计时，不执行操作
      if (!this.isPhoneValid || this.cooldown > 0) {
        if (!this.isPhoneValid) {
          this.phoneError = true;
          uni.showToast({
            title: '请输入正确的手机号',
            icon: 'none'
          });
        }
        return;
      }
      
      console.log('获取验证码', this.phone);
      
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
    },
    handleLogin() {
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
      
      console.log('登录', this.phone, this.verifyCode);
      
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
        try {
          this.$store.commit('setUser', userInfo);
        } catch (e) {
          console.error('存储用户信息失败:', e);
        }
        
        uni.setStorageSync('token', 'mock_token_' + Date.now());
        
        uni.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,
          success: () => {
            // 简单显示登录成功，不跳转页面
            console.log('登录成功');
          }
        });
        
        // 重置提交状态
        this.isSubmitting = false;
      }, 1000); // 模拟网络请求延迟
    },
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

.input-wrapper {
  margin-bottom: 24px;
  position: relative;
  width: 100%;
}

.input-field {
  width: 100%;
  height: 48px;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  color: #333333;
}

.input-field:focus {
  border-color: #55C353;
}

.input-error {
  border-color: #FF5252 !important;
}

.error-text {
  font-size: 12px;
  color: #FF5252;
  position: absolute;
  left: 0;
  bottom: -20px;
}

.code-area {
  display: flex;
  width: 100%;
  align-items: flex-start;
}

.flex-1 {
  flex: 1;
  margin-right: 12px;
}

.code-button {
  width: 120px;
  min-width: 120px;
  height: 48px;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333333;
  background-color: #FFFFFF;
  transition: all 0.3s ease;
}

.code-button:active:not(.btn-disabled) {
  opacity: 0.7;
  transform: scale(0.98);
}

.btn-disabled {
  opacity: 0.6;
  pointer-events: none;
}

.login-button {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: #55C353;
  color: #FFFFFF;
  font-size: 16px;
  margin-top: 32px;
}

.button-disabled {
  opacity: 0.6;
  pointer-events: none;
}

.login-button:active:not(.button-disabled) {
  opacity: 0.8;
  transform: scale(0.98);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #FFFFFF;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 协议区域 */
.agreement-wrapper {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
}

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