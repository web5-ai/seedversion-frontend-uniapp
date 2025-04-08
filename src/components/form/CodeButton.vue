<template>
  <view 
    class="code-button"
    :class="{'btn-disabled': disabled || cooldown > 0}"
    @click="handleClick"
    :aria-disabled="disabled || cooldown > 0"
  >
    <text>{{ cooldown > 0 ? `${cooldown}秒后重试` : buttonText }}</text>
  </view>
</template>

<script>
export default {
  name: 'CodeButton',
  props: {
    // 按钮文本
    buttonText: {
      type: String,
      default: '获取验证码'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 倒计时秒数
    cooldown: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClick() {
      // 如果按钮禁用或正在倒计时，不触发点击事件
      if (this.disabled || this.cooldown > 0) return;
      
      this.$emit('click');
    }
  }
}
</script>

<style scoped>
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
</style> 