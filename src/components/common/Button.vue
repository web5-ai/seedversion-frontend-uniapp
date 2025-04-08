<template>
  <view 
    class="custom-button"
    :class="[
      `button-${type}`,
      { 'button-disabled': disabled || loading }
    ]"
    @click="handleClick"
    :aria-disabled="disabled || loading"
  >
    <view class="loading-spinner" v-if="loading"></view>
    <text v-else class="button-text" :class="`text-${type}`">
      <slot></slot>
    </text>
  </view>
</template>

<script>
export default {
  name: 'CommonButton',
  props: {
    // 按钮类型：primary(主要按钮), secondary(次要按钮)
    type: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary'].includes(value)
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示加载中状态
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(event) {
      // 如果按钮禁用或正在加载中，不触发点击事件
      if (this.disabled || this.loading) return;
      
      this.$emit('click', event);
    }
  }
}
</script>

<style scoped>
.custom-button {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.button-primary {
  background-color: #55C353;
}

.button-secondary {
  background-color: #FFFFFF;
  border: 1px solid #E8E8E8;
}

.button-disabled {
  opacity: 0.6;
  pointer-events: none;
}

.custom-button:active:not(.button-disabled) {
  opacity: 0.8;
  transform: scale(0.98);
}

.button-text {
  font-size: 16px;
}

.text-primary {
  color: #FFFFFF;
}

.text-secondary {
  color: #333333;
}

/* 加载动画 */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #FFFFFF;
  animation: spin 1s infinite linear;
}

.button-secondary .loading-spinner {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: #333333;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 