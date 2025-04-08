<template>
  <view class="input-wrapper">
    <input 
      class="input-field"
      :class="{'input-error': error}"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @input="handleInput"
      :aria-label="ariaLabel"
    />
    <text v-if="error && errorMessage" class="error-text">{{ errorMessage }}</text>
  </view>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    // 输入框的值
    value: {
      type: [String, Number],
      default: ''
    },
    // 输入框类型
    type: {
      type: String,
      default: 'text'
    },
    // 占位符文本
    placeholder: {
      type: String,
      default: ''
    },
    // 最大输入长度
    maxlength: {
      type: Number,
      default: -1
    },
    // 是否处于错误状态
    error: {
      type: Boolean,
      default: false
    },
    // 错误提示信息
    errorMessage: {
      type: String,
      default: ''
    },
    // 无障碍标签
    ariaLabel: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput(e) {
      // 将输入内容通过input事件发送给父组件
      this.$emit('input', e.target.value);
    }
  }
}
</script>

<style scoped>
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

/* 修复输入框占位符颜色 */
.input-field::placeholder {
  color: #999999;
}
</style> 