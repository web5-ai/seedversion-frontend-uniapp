<template>
  <view class="info-item">
    <view class="info-label">
      <image v-if="icon" :src="icon" class="info-icon" :alt="label + '图标'" />
      <text>{{ label }}</text>
    </view>
    <text class="info-value">{{ value }}</text>
  </view>
</template>

<script>
export default {
  name: 'InfoItem',
  props: {
    /**
     * 信息项标签
     */
    label: {
      type: String,
      required: true
    },
    /**
     * 信息项值
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * 图标路径
     */
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.info-label {
  display: flex;
  align-items: center;
  color: #4a7a4d;
  font-size: 14px;
}

.info-icon {
  width: 16px;
  height: 16px;
  margin-right: 6px;
}

.info-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
</style> 