<template>
  <view class="card" :class="{ 'card-shadow': shadow, 'card-hover': hover }">
    <view v-if="title" class="card-header">
      <text class="card-title">{{ title }}</text>
      <slot name="header-right"></slot>
    </view>
    <slot></slot>
    <view v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script>
/**
 * 卡片组件
 * 使用方法: <card title="卡片标题" :shadow="true" :hover="true">卡片内容</card>
 */
export default {
  name: 'Card',
  props: {
    /**
     * 卡片标题
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * 是否显示阴影
     */
    shadow: {
      type: Boolean,
      default: true
    },
    /**
     * 是否启用悬停效果
     */
    hover: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.card {
  @apply bg-card rounded-[var(--border-radius-md)] overflow-hidden mb-3;
  padding: var(--spacing-md);
}

.card-shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-hover:active {
  opacity: 0.9;
}

.card-header {
  @apply flex justify-between items-center mb-3;
}

.card-title {
  @apply text-primary font-medium text-base;
}

.card-footer {
  @apply mt-3 pt-3 border-t border-[var(--border-color)];
}
</style> 