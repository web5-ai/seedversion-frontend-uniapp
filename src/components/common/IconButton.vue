<template>
  <button 
    class="icon-button"
    :class="[
      type === 'primary' ? 'primary-button' : 'secondary-button',
      { disabled: disabled }
    ]"
    :disabled="disabled"
    @click="onClick"
  >
    <image v-if="icon" :src="icon" mode="aspectFit" class="button-icon" :alt="text + '图标'" />
    <text class="button-text">{{ text }}</text>
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    /**
     * 按钮文本
     */
    text: {
      type: String,
      required: true
    },
    /**
     * 图标路径
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * 按钮类型：primary为主要按钮，secondary为次要按钮
     */
    type: {
      type: String,
      default: 'secondary',
      validator: value => ['primary', 'secondary'].includes(value)
    },
    /**
     * 是否禁用按钮
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * 点击事件处理函数
     */
    onClick(event) {
      this.$emit('click', event);
    }
  }
}
</script>

<style>
.icon-button {
  flex: 1;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  margin: 0 8px;
  font-weight: 500;
  text-align: center;
}

.primary-button {
  background-color: #4CAF50;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
}

.secondary-button {
  background-color: rgba(76, 175, 80, 0.1);
  color: #3a8a3e;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button-icon {
  width: 18px;
  height: 18px;
  margin-right: 6px;
}

.button-text {
  font-size: 14px;
  text-align: center;
}
</style> 