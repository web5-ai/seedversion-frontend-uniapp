<template>
  <view class="page-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">&lt;</text>
      </view>
      <text class="header-title">历史反馈记录</text>
    </view>
    
    <!-- 反馈列表 -->
    <view class="feedback-list">
      <view 
        v-for="(item, index) in feedbackList" 
        :key="item.id"
        class="feedback-item"
        :class="getStatusClass(item.status)"
        @click="viewDetail(item)"
      >
        <!-- 日期 -->
        <view class="feedback-date">{{ formatDate(item.create_time) }}</view>
        
        <!-- 问题内容 -->
        <view class="feedback-problem">
          <text class="problem-label">问题：</text>
          <text class="problem-content">{{ item.types_msg }}</text>
        </view>
        
        <!-- 处理状态 -->
        <view class="feedback-status">
          <text class="status-label">状态：</text>
          <text class="status-content">{{ getStatusLabel(item.status) }}</text>
        </view>
        
        <!-- 评分 -->
        <view class="feedback-score">
          <text class="score-label">评分：</text>
          <text class="score-content">{{ item.score }}分</text>
        </view>
        
        <!-- 右箭头 -->
        <view class="arrow-right">
          <text class="arrow-icon">›</text>
        </view>
      </view>
    </view>
    
    <!-- 分页 -->
    <view class="pagination" v-if="pagination.total > 0">
      <view class="page-info">
        第 {{ pagination.current_page }}/{{ pagination.last_page }} 页
      </view>
      <view class="page-buttons">
        <button 
          :disabled="pagination.current_page === 1"
          @click="loadPage(pagination.current_page - 1)"
        >上一页</button>
        <button 
          :disabled="!pagination.has_more"
          @click="loadPage(pagination.current_page + 1)"
        >下一页</button>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-state" v-if="feedbackList.length === 0">
      <image src="/static/icons/feedback.svg" class="empty-icon" />
      <text class="empty-text">暂无反馈记录</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      feedbackList: [],
      pagination: {
        total: 0,
        per_page: 15,
        current_page: 1,
        last_page: 1,
        has_more: false
      }
    }
  },
  
  onLoad() {
    this.loadFeedbackList()
  },
  
  methods: {
    // 加载反馈列表
    async loadFeedbackList() {
      try {
        const token = uni.getStorageSync('token')
        const res = await uni.request({
          url: 'api/feedback/index',
          method: 'POST',
          header: {
            Authorization: token,
            Server: true
          },
        })

        if (res.data.code === 1) {
          const { data, total, current_page, last_page, per_page, has_more } = res.data.data
          this.feedbackList = data
          this.pagination = {
            total,
            current_page,
            last_page,
            per_page,
            has_more
          }
        } else {
          throw new Error(res.data.msg || '加载失败')
        }
      } catch (error) {
        console.error('加载反馈列表失败:', error)
        uni.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        })
      }
    },

    // 加载指定页
    loadPage(page) {
      this.pagination.current_page = page
      this.loadFeedbackList()
    },

    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 获取状态标签文字
    getStatusLabel(status) {
      const statusMap = {
        0: '待处理',
        1: '处理中',
        2: '已处理',
        3: '已关闭'
      }
      return statusMap[status] || '未知状态'
    },
    
    // 获取状态相关的CSS类
    getStatusClass(status) {
      const classMap = {
        0: 'status-pending',
        1: 'status-processing',
        2: 'status-resolved',
        3: 'status-closed'
      }
      return classMap[status] || 'status-pending'
    },
    
    // 格式化时间戳
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    },
    
    // 查看反馈详情
    viewDetail(item) {
      // uni.navigateTo({
      //   url: `/pages/feedback/index?id=${item.id}`
      // })
    }
  }
}
</script>

<style>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

/* 顶部标题栏 */
.header {
  background-color: var(--primary-color, #4CAF50);
  padding: 40px 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.header-title {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.back-btn {
  position: absolute;
  left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}

.back-icon {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

/* 反馈列表 */
.feedback-list {
  padding: 15px;
}

.feedback-item {
  position: relative;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  overflow: hidden;
  transition: opacity 0.2s ease;
  cursor: pointer; /* 使hover显示手型指针 */
}

.feedback-item:active {
  opacity: 0.8; /* 点击时的视觉反馈 */
}

/* 状态样式 */
.status-resolved {
  background-color: #4CAF50;
  color: #fff;
}

.status-processing {
  background-color: #FFC107;
  color: #333;
}

.status-pending {
  background-color: #F5F5F5;
  color: #333;
  border: 1px solid #E0E0E0;
}

.status-closed {
  background-color: #9E9E9E;
  color: #fff;
}

.feedback-date {
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: 500;
}

.feedback-problem {
  display: flex;
  margin-bottom: 5px;
}

.problem-label {
  font-size: 14px;
}

.problem-content {
  font-size: 14px;
  flex: 1;
}

.feedback-status {
  display: flex;
}

.status-label {
  font-size: 14px;
}

.status-content {
  font-size: 14px;
  flex: 1;
}

.arrow-right {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}

.arrow-icon {
  font-size: 20px;
}

/* 评分 */
.feedback-score {
  display: flex;
  margin-top: 5px;
}

.score-label {
  font-size: 14px;
}

.score-content {
  font-size: 14px;
  flex: 1;
}

/* 分页 */
.pagination {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.page-info {
  font-size: 14px;
  color: #666;
}

.page-buttons {
  display: flex;
  gap: 15px;
}

.page-buttons button {
  font-size: 14px;
  padding: 5px 15px;
  background-color: var(--primary-color, #4CAF50);
  color: white;
  border: none;
  border-radius: 4px;
}

.page-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 空状态 */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 10px;
  opacity: 0.5;
}

.empty-text {
  font-size: 14px;
  color: #999;
}
</style> 
