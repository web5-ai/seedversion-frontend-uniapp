<template>
  <view class="icon-text" :class="[`icon-text-${type}`, { 'icon-text-vertical': vertical }]" @click="handleClick">
    <view class="icon-container" :class="iconClass">
      <image v-if="icon" :src="icon" mode="aspectFit" class="icon"></image>
      <slot name="icon"></slot>
    </view>
    <text class="text" :class="textClass">{{ text }}</text>
    <slot></slot>
  </view>
</template>

<script>
/**
 * 图标+文本组件
 * 使用方法: <icon-text icon="/static/icons/icon.svg" text="文本" type="primary" :vertical="false" @click="handleClick" />
 */
export default {
  name: 'IconText',
  props: {
    /**
     * 图标路径
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * 显示文本
     */
    text: {
      type: String,
      required: true
    },
    /**
     * 样式类型: primary, secondary, success, warning, danger
     */
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
    },
    /**
     * 是否垂直排列（上下结构）
     */
    vertical: {
      type: Boolean,
      default: false
    },
    /**
     * 图标容器的自定义类
     */
    iconClass: {
      type: String,
      default: ''
    },
    /**
     * 文本的自定义类
     */
    textClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    }
  }
}
</script>

<style>
.icon-text {
  @apply flex items-center;
}

.icon-text-vertical {
  @apply flex-col justify-center;
}

.icon-container {
  @apply flex items-center justify-center;
  width: 24px;
  height: 24px;
}

.icon-text-vertical .icon-container {
  margin-bottom: 4px;
}

.icon-text:not(.icon-text-vertical) .icon-container {
  margin-right: 6px;
}

.icon {
  width: 100%;
  height: 100%;
}

.text {
  @apply text-[var(--text-primary)] text-sm;
}

/* 类型样式 */
.icon-text-primary .text {
  color: var(--primary-color);
}

.icon-text-secondary .text {
  color: var(--text-secondary);
}

.icon-text-success .text {
  color: var(--success-color);
}

.icon-text-warning .text {
  color: var(--warning-color);
}

.icon-text-danger .text {
  color: var(--error-color);
}
</style> 