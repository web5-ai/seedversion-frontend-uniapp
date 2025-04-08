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
        <input 
          class="input-field"
          type="number"
          v-model="phone"
          placeholder="请输入手机号"
        />
        
        <!-- 验证码输入区域 -->
        <view class="verify-code-area">
          <input 
            class="input-field verify-code-input"
            type="number"
            v-model="verifyCode"
            placeholder="请输入验证码"
            maxlength="6"
          />
          <view 
            class="get-code-btn"
            @click="getVerifyCode"
          >
            <text>{{ cooldown > 0 ? `${cooldown}秒后重试` : '获取验证码' }}</text>
          </view>
        </view>
        
        <!-- 登录按钮 -->
        <view 
          class="login-btn"
          @click="handleLogin"
        >
          <text class="btn-text">登录/注册</text>
        </view>
      </view>
      
      <!-- 协议文本 -->
      <view class="agreement-area">
        <text class="agreement-text">登录即表示同意 </text>
        <text class="agreement-link" @click="viewTerms('user')">《用户协议》</text>
        <text class="agreement-text"> 和 </text>
        <text class="agreement-link" @click="viewTerms('privacy')">《隐私政策》</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      verifyCode: '',
      cooldown: 0,
      timer: null
    }
  },
  methods: {
    getVerifyCode() {
      // 验证手机号
      if (!this.phone || this.phone.length !== 11) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return
      }
      
      // 开始倒计时
      this.cooldown = 60
      this.timer = setInterval(() => {
        this.cooldown--
        if (this.cooldown <= 0) {
          clearInterval(this.timer)
        }
      }, 1000)
      
      // TODO: 调用发送验证码的API
      uni.showToast({
        title: '验证码已发送',
        icon: 'success'
      })
    },
    handleLogin() {
      // 验证输入
      if (!this.phone || this.phone.length !== 11) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return
      }
      
      if (!this.verifyCode || this.verifyCode.length !== 6) {
        uni.showToast({
          title: '请输入6位验证码',
          icon: 'none'
        })
        return
      }
      
      // TODO: 调用登录API
      const userInfo = {
        userId: 'user_' + Date.now(),
        phone: this.phone,
        nickname: '用户' + this.phone.substring(7)
      }
      
      // 模拟登录成功
      this.$store.commit('setUser', userInfo)
      uni.setStorageSync('token', 'mock_token_' + Date.now())
      
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500,
        success: () => {
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/hello/index'
            })
          }, 1500)
        }
      })
    },
    viewTerms(type) {
      // 查看协议
      const title = type === 'user' ? '用户协议' : '隐私政策'
      uni.showModal({
        title: title,
        content: `这是${title}内容，实际项目中应该跳转到协议页面或者展示完整协议内容。`,
        showCancel: false
      })
    }
  },
  onUnload() {
    // 页面卸载时清除定时器
    if (this.timer) {
      clearInterval(this.timer)
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

.input-field {
  width: 100%;
  height: 48px;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  padding: 0 16px;
  margin-bottom: 12px;
  font-size: 14px;
  box-sizing: border-box;
}

.verify-code-area {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
}

.verify-code-input {
  flex: 1;
  margin-right: 12px;
  margin-bottom: 0;
}

.get-code-btn {
  width: 120px;
  height: 48px;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333333;
  background-color: #FFFFFF;
}

.login-btn {
  width: 100%;
  height: 48px;
  background-color: #55C353;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
}

.btn-text {
  color: #FFFFFF;
  font-size: 16px;
}

/* 协议区域 */
.agreement-area {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
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

/* 修复输入框占位符颜色 */
.input-field::placeholder {
  color: #999999;
}
</style> 