<template>
  <view 
    class="list-item" 
    :class="{ 'with-arrow': arrow, 'with-hover': hover }"
    @click="handleClick"
  >
    <view v-if="$slots.icon || icon" class="list-item-icon">
      <slot name="icon">
        <image v-if="icon" :src="icon" mode="aspectFit" class="icon-image"></image>
      </slot>
    </view>
    
    <view class="list-item-content">
      <view class="list-item-title">
        <text>{{ title }}</text>
        <slot name="title-after"></slot>
      </view>
      
      <view v-if="$slots.description || description" class="list-item-description">
        <slot name="description">
          <text>{{ description }}</text>
        </slot>
      </view>
    </view>
    
    <view class="list-item-right">
      <slot name="right">
        <text v-if="value" class="list-item-value">{{ value }}</text>
      </slot>
      
      <view v-if="arrow" class="list-item-arrow">
        <image src="/static/icons/arrow-right.svg" mode="aspectFit" class="arrow-icon"></image>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * 列表项组件
 * 使用方法: 
 * <list-item 
 *   title="列表项标题" 
 *   description="描述文本" 
 *   icon="/static/icons/icon.svg" 
 *   value="值"
 *   :arrow="true" 
 *   :hover="true" 
 *   @click="handleClick"
 * />
 */
export default {
  name: 'ListItem',
  props: {
    /**
     * 列表项标题
     */
    title: {
      type: String,
      required: true
    },
    /**
     * 列表项描述
     */
    description: {
      type: String,
      default: ''
    },
    /**
     * 图标路径
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * 右侧值
     */
    value: {
      type: [String, Number],
      default: ''
    },
    /**
     * 是否显示右箭头
     */
    arrow: {
      type: Boolean,
      default: false
    },
    /**
     * 是否启用悬停效果
     */
    hover: {
      type: Boolean,
      default: true
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
.list-item {
  @apply flex items-center px-4 py-3 bg-card border-b border-[var(--border-color)];
}

.list-item:last-child {
  @apply border-b-0;
}

.with-hover:active {
  background-color: rgba(0, 0, 0, 0.05);
}

.list-item-icon {
  @apply mr-3;
}

.icon-image {
  width: 24px;
  height: 24px;
}

.list-item-content {
  @apply flex-1 mr-2;
}

.list-item-title {
  @apply flex items-center text-[var(--text-primary)] text-base;
}

.list-item-description {
  @apply text-[var(--text-secondary)] text-sm mt-1;
}

.list-item-right {
  @apply flex items-center;
}

.list-item-value {
  @apply text-[var(--text-secondary)] text-sm mr-2;
}

.list-item-arrow {
  @apply ml-2;
}

.arrow-icon {
  width: 16px;
  height: 16px;
}
</style> 