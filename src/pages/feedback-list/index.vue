<template>
  <view class="page-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">&#xe600;</text>
      </view>
      <text class="header-title">历史反馈记录</text>
    </view>
    
    <!-- 反馈列表 -->
    <view class="feedback-list">
      <view 
        v-for="(item, index) in feedbacks" 
        :key="index"
        class="feedback-item"
        :class="getStatusClass(item.status)"
        @click="viewFeedbackDetail(item)"
      >
        <!-- 日期 -->
        <view class="feedback-date">{{ item.date }}</view>
        
        <!-- 问题内容 -->
        <view class="feedback-problem">
          <text class="problem-label">问题：</text>
          <text class="problem-content">{{ item.problem }}</text>
        </view>
        
        <!-- 处理状态 -->
        <view class="feedback-status">
          <text class="status-label">状态：</text>
          <text class="status-content">{{ getStatusLabel(item.status) }}</text>
        </view>
        
        <!-- 右箭头 -->
        <view class="arrow-right">
          <text class="arrow-icon">&#xe601;</text>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-state" v-if="feedbacks.length === 0">
      <image src="/static/icons/feedback.svg" class="empty-icon" />
      <text class="empty-text">暂无反馈记录</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 反馈记录列表
      feedbacks: [
        {
          id: 'FB001',
          date: '2023-12-03',
          problem: '成分含量不准确',
          status: 'resolved', // 已处理
          detail: '油酸含量检测偏低，与实验室检测结果有差异'
        },
        {
          id: 'FB002',
          date: '2023-12-03',
          problem: '成分含量不准确',
          status: 'processing', // 处理中
          detail: '亚油酸含量检测不准确，请校准检测算法'
        },
        {
          id: 'FB003',
          date: '2023-12-03',
          problem: '成分含量不准确',
          status: 'resolved', // 已处理
          detail: '检测结果与专业设备检测有偏差，希望提高准确性'
        }
      ]
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    
    // 获取状态标签文字
    getStatusLabel(status) {
      const statusMap = {
        'pending': '待处理',
        'processing': '处理中',
        'resolved': '已处理',
        'closed': '已关闭'
      };
      return statusMap[status] || status;
    },
    
    // 获取状态相关的CSS类
    getStatusClass(status) {
      return `status-${status}`;
    },
    
    // 查看反馈详情
    viewFeedbackDetail(item) {
      uni.navigateTo({
        url: `/pages/feedback-detail/index?id=${item.id}`
      });
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
}

.back-icon {
  color: #fff;
  font-size: 24px;
  font-family: "iconfont";
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
  font-family: "iconfont";
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