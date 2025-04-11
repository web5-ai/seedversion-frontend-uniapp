<template>
  <view class="page-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="header-title">历史记录</text>
    </view>
    
    <!-- 主体内容区 -->
    <view class="content">
      <!-- 使用记录列表组件 -->
      <record-list 
        :records="historyRecords.data" 
        :show-time="true"
        @item-click="viewDetail"
        :empty-text="'暂无检测记录'"
      />
      <!-- 分页按钮 -->
      <view class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <button @click="nextPage" :disabled="!historyRecords.has_more">下一页</button>
      </view>
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
      // 模拟的历史记录
      historyRecords: {},
      currentPage: 1 // 当前页码
    }
  },
  onLoad() {
    this.fetchHistoryRecords();
  },
  methods: {
    fetchHistoryRecords() {
      uni.request({
        url: 'api/seed/index',
        method: 'POST',
        data: {
          page: this.currentPage,
          limit: 10,
        }, 
        header: {
          Authorization: uni.getStorageSync('token'),
          Server: true // 服务器端接收的字段名
        },
        success: (res) => {
          this.historyRecords = res.data.data;
        }
      });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchHistoryRecords();
      }
    },
    nextPage() {
      if (this.historyRecords.has_more) {
        this.currentPage++;
        this.fetchHistoryRecords();
      }
    },
    // 查看详情
    viewDetail(record) {
      // TODO: 跳转到详情页
      uni.setStorageSync('current_analysis_result', record);
      uni.navigateTo({
        url: `/pages/result/index?recordId=${record.id}`
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

/* 分页按钮样式 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
}
</style>