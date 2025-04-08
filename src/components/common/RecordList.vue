<template>
  <view class="record-list-container">
    <!-- 检测记录列表 -->
    <view class="record-list">
      <view 
        class="record-item" 
        v-for="(item, index) in records" 
        :key="index"
        @click="handleItemClick(item)"
      >
        <view class="record-image" :style="imageBackgroundColor">
          <image src="/static/images/canola.svg" mode="aspectFit" class="plant-icon" alt="油菜籽图标"></image>
        </view>
        <view class="record-info">
          <view class="record-header">
            <text class="record-date">{{ item.date }}</text>
            <text v-if="showTime && item.time" class="record-time">{{ item.time }}</text>
          </view>
          <view class="record-data">
            <view class="data-item">
              <text class="data-label">油酸：</text>
              <text class="data-value oil-value">{{ item.oilAcid }}</text>
            </view>
            <view class="data-item">
              <text class="data-label">亚油酸：</text>
              <text class="data-value linoleic-value">{{ item.linoleicAcid }}</text>
            </view>
            <view class="data-item">
              <text class="data-label">品质评级：</text>
              <text class="data-value quality-value">{{ item.quality }}</text>
            </view>
          </view>
        </view>
        <view class="record-arrow">
          <text class="arrow-icon">›</text>
        </view>
      </view>
    </view>
    
    <!-- 空状态显示 -->
    <view class="empty-state" v-if="records.length === 0">
      <image src="/static/icons/history.svg" mode="aspectFit" class="empty-icon" alt="历史记录图标"></image>
      <text class="empty-text">{{ emptyText }}</text>
    </view>
  </view>
</template>

<script>
/**
 * 检测记录列表组件
 * 用于展示油菜籽检测的历史记录
 */
export default {
  name: 'RecordList',
  props: {
    /**
     * 记录数据数组
     */
    records: {
      type: Array,
      default: () => []
    },
    /**
     * 是否显示时间
     */
    showTime: {
      type: Boolean,
      default: false
    },
    /**
     * 图片背景颜色
     */
    imageBackgroundColor: {
      type: String,
      default: 'background-color: #e0f2e0'
    },
    /**
     * 空状态文本
     */
    emptyText: {
      type: String,
      default: '暂无检测记录'
    }
  },
  methods: {
    /**
     * 点击记录项
     */
    handleItemClick(item) {
      this.$emit('item-click', item);
    }
  }
}
</script>

<style>
.record-list-container {
  width: 100%;
}

/* 检测记录列表 */
.record-list {
  margin-bottom: 15px;
  width: 100%;
}

.record-item {
  display: flex;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  align-items: center;
}

.record-image {
  width: 70px;
  height: 70px;
  border-radius: 4px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plant-icon {
  width: 40px;
  height: 40px;
}

.record-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.record-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.record-date {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.record-time {
  font-size: 12px;
  color: #999;
}

.record-data {
  display: flex;
  flex-direction: column;
}

.data-item {
  display: flex;
  margin-bottom: 4px;
}

.data-label {
  font-size: 13px;
  color: #666;
}

.data-value {
  font-size: 13px;
  font-weight: 500;
}

.oil-value, .linoleic-value, .quality-value {
  color: #4CAF50;
}

.record-arrow {
  margin-left: 8px;
}

.arrow-icon {
  font-size: 20px;
  color: #ccc;
}

/* 空状态 */
.empty-state {
  margin-top: 20px;
  text-align: center;
  color: #999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
}

.empty-text {
  font-size: 14px;
}
</style> 