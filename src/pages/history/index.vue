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
      
      <!-- 使用记录列表组件 -->
      <record-list 
        :records="filteredRecords" 
        :show-time="true"
        @item-click="viewDetail"
        :empty-text="'暂无' + filterLabel + '检测记录'"
      />
    </view>
  </view>
</template>

<script>
import IconSvg from '@/components/common/IconSvg.vue';
import RecordList from '@/components/common/RecordList.vue';

export default {
  components: {
    IconSvg,
    RecordList
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
</style> 