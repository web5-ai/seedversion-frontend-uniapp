<template>
  <view class="chart-bar">
    <view class="chart-label">
      <text class="label-text">{{ label }}</text>
    </view>
    <view class="bar-container">
      <view class="bar-track">
        <view class="bar-fill" :style="{ width: `${percentage}%` }"></view>
      </view>
      <text class="bar-value">{{ value }}{{ unit }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ChartBar',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      required: true
    },
    max: {
      type: Number,
      default: 100
    },
    unit: {
      type: String,
      default: '%'
    }
  },
  computed: {
    percentage() {
      const val = parseFloat(this.value);
      return Math.min(100, (val / this.max) * 100);
    }
  }
}
</script>

<style>
.chart-bar {
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  align-items: center;
}

.chart-label {
  width: 140rpx;
  margin-right: 12px;
}

.label-text {
  color: #666;
  font-size: 14px;
}

.bar-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.bar-track {
  flex: 1;
  height: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 12px;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  border-radius: 8px;
}

.bar-value {
  width: 60rpx;
  text-align: right;
  font-size: 14px;
  color: #333;
  font-weight: bold;
}
</style> 