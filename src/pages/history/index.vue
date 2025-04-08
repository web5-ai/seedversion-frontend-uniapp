<template>
  <view class="page-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="header-title">历史记录</text>
    </view>
    
    <!-- 主体内容区 -->
    <view class="content">
      <!-- 过滤器 -->
      <view class="filter-bar">
        <view class="filter-item" 
              :class="{ active: currentFilter === 'all' }" 
              @click="setFilter('all')">
          全部
        </view>
        <view class="filter-item" 
              :class="{ active: currentFilter === 'month' }" 
              @click="setFilter('month')">
          本月
        </view>
        <view class="filter-item" 
              :class="{ active: currentFilter === 'week' }" 
              @click="setFilter('week')">
          本周
        </view>
      </view>
      
      <!-- 检测记录列表 -->
      <view class="history-list">
        <view 
          class="history-item" 
          v-for="(item, index) in filteredRecords" 
          :key="index"
          @click="viewDetail(item)"
        >
          <view class="history-image" :style="{ backgroundColor: '#e0f2e0' }">
            <image src="/static/images/canola.svg" mode="aspectFit" class="plant-icon" alt="油菜籽图标"></image>
          </view>
          <view class="history-info">
            <view class="history-header">
              <text class="history-date">{{ item.date }}</text>
              <text class="history-time">{{ item.time }}</text>
            </view>
            <view class="history-data">
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
          <view class="history-arrow">
            <text class="arrow-icon">›</text>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="filteredRecords.length === 0">
        <image src="/static/icons/history.svg" mode="aspectFit" class="empty-icon" alt="历史记录图标"></image>
        <text class="empty-text">暂无{{ filterLabel }}检测记录</text>
      </view>
    </view>
  </view>
</template>

<script>
import IconSvg from '@/components/common/IconSvg.vue';

export default {
  components: {
    IconSvg
  },
  data() {
    return {
      // 当前过滤器
      currentFilter: 'all',
      // 模拟的历史记录
      historyRecords: [
        {
          id: '001',
          date: '2023-12-25',
          time: '15:30',
          image: '/static/images/canola.svg',
          oilAcid: '42.8%',
          linoleicAcid: '23.5%',
          quality: '优'
        },
        {
          id: '002',
          date: '2023-12-20',
          time: '10:15',
          image: '/static/images/canola.svg',
          oilAcid: '41.2%',
          linoleicAcid: '24.1%',
          quality: '优'
        },
        {
          id: '003',
          date: '2023-12-15',
          time: '09:45',
          image: '/static/images/canola.svg',
          oilAcid: '39.5%',
          linoleicAcid: '25.8%',
          quality: '良'
        },
        {
          id: '004',
          date: '2023-11-30',
          time: '14:20',
          image: '/static/images/canola.svg',
          oilAcid: '38.0%',
          linoleicAcid: '26.5%',
          quality: '良'
        },
        {
          id: '005',
          date: '2023-11-15',
          time: '16:05',
          image: '/static/images/canola.svg',
          oilAcid: '36.3%',
          linoleicAcid: '27.2%',
          quality: '中'
        }
      ]
    }
  },
  computed: {
    // 根据过滤条件显示不同的记录
    filteredRecords() {
      const now = new Date();
      
      if (this.currentFilter === 'all') {
        return this.historyRecords;
      } else if (this.currentFilter === 'month') {
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        return this.historyRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate.getMonth() === currentMonth && 
                 recordDate.getFullYear() === currentYear;
        });
      } else if (this.currentFilter === 'week') {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        
        return this.historyRecords.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate >= oneWeekAgo;
        });
      }
      
      return this.historyRecords;
    },
    
    // 过滤器标签
    filterLabel() {
      if (this.currentFilter === 'month') return '本月';
      if (this.currentFilter === 'week') return '本周';
      return '';
    }
  },
  methods: {
    // 设置过滤条件
    setFilter(filter) {
      this.currentFilter = filter;
    },
    
    // 查看详情
    viewDetail(record) {
      // TODO: 跳转到详情页
      uni.showToast({
        title: '查看详情: ' + record.id,
        icon: 'none'
      });
    }
  }
}
</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 50px; /* 为底部TabBar预留空间 */
}

/* 顶部标题栏 */
.header {
  background-color: #4CAF50;
  padding: 40px 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-title {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
}

/* 主体内容区 */
.content {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

/* 过滤器 */
.filter-bar {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
}

.filter-item {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  color: #666;
  font-size: 14px;
  transition: all 0.3s ease;
}

.filter-item.active {
  color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.1);
  font-weight: 500;
}

/* 历史记录列表 */
.history-list {
  flex: 1;
}

.history-item {
  display: flex;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  align-items: center;
}

.history-image {
  width: 60px;
  height: 60px;
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

.history-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.history-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.history-date {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.history-time {
  font-size: 12px;
  color: #999;
}

.history-data {
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

.history-arrow {
  margin-left: 8px;
}

.arrow-icon {
  font-size: 20px;
  color: #ccc;
}

/* 空状态 */
.empty-state {
  margin-top: 60px;
  text-align: center;
  color: #999;
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