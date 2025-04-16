<template>
  <view class="page-container">
    <!-- 顶部导航栏 -->
    <view class="navigation-bar" :style="{ height: (44 + statusBarHeight) + 'px', paddingTop: statusBarHeight + 'px' }">
      <view class="nav-left">
        <view class="back-button" @click="goBack">
          <text class="back-icon">&lt;</text>
        </view>
      </view>
      <view class="nav-title">反馈详情</view>
      <view class="nav-right"></view>
    </view>

    <!-- 反馈内容区域 -->
    <view class="feedback-container">
      <!-- 样本预览 -->
      <view class="sample-preview">
        <image :src="feedbackData.image" mode="aspectFill" class="sample-image" @click="previewImage(feedbackData.images[0])" />
        <view class="sample-info">
          <view class="info-row">
            <text class="info-label">油脂含量:</text>
            <text class="info-value">{{ feedbackData.oil || '未知' }}</text>
          </view>
          <view class="info-row">
            <text class="info-label">蛋白质含量:</text>
            <text class="info-value">{{ feedbackData.protein || '未知' }}</text>
          </view>
        </view>
      </view>

      <!-- 反馈详情 -->
      <view class="feedback-section">
        <view class="section-title">反馈类型</view>
        <view class="detail-item">
          <text class="detail-value">{{ feedbackData.types_msg || '未提供' }}</text>
        </view>
      </view>

      <!-- 准确性评分 -->
      <view class="feedback-section">
        <view class="section-title">准确性评分</view>
        <view class="rating-container">
          <view
            v-for="i in 5"
            :key="i"
            class="rating-star"
            :class="{ active: i <= feedbackData.score }"
          >
            <text class="star-icon">★</text>
          </view>
        </view>
        <text class="rating-text">{{ getRatingLabel(feedbackData.score) }}</text>
      </view>

      <!-- 实际成分信息 -->
      <view class="feedback-section" v-if="feedbackData.actual_oil || feedbackData.actual_protein">
        <view class="section-title">实际成分信息</view>
        <view class="detail-content">
          <view class="detail-item" v-if="feedbackData.actual_oil">
            <text class="detail-label">油脂含量:</text>
            <text class="detail-value">{{ feedbackData.actual_oil }}%</text>
          </view>
          <view class="detail-item" v-if="feedbackData.actual_protein">
            <text class="detail-label">蛋白质含量:</text>
            <text class="detail-value">{{ feedbackData.actual_protein }}%</text>
          </view>
        </view>
      </view>

      <!-- 详细反馈 -->
      <view class="feedback-section" v-if="feedbackData.detail">
        <view class="section-title">详细说明</view>
        <view class="detail-content">
          <text class="detail-text">{{ feedbackData.detail }}</text>
        </view>
      </view>

      <!-- 联系方式 -->
      <view class="feedback-section" v-if="feedbackData.contact">
        <view class="section-title">联系方式</view>
        <view class="detail-content">
          <text class="detail-text">{{ feedbackData.contact }}</text>
        </view>
      </view>

      <!-- 提交时间 -->
      <view class="feedback-section">
        <view class="section-title">提交时间</view>
        <view class="detail-content">
          <text class="detail-text">{{ formatTimestamp(feedbackData.create_time) }}</text>
        </view>
      </view>

      <!-- 处理结果 -->
      <view class="feedback-section" v-if="feedbackData.reply">
        <view class="section-title">处理结果</view>
        <view class="detail-content">
          <text class="detail-text">{{ feedbackData.reply }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      feedbackData: {}, // 从上一页传来的数据
      statusBarHeight: 0 // 状态栏高度
    }
  },
  onLoad(options) {
    // 获取状态栏高度
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight || 0;
    console.log('页面状态栏高度:', this.statusBarHeight);

    // 获取上一页传递的数据
    if (options.id) {
      this.feedbackData = uni.getStorageSync('feedbackData');
      uni.request({
        url: 'http://youcaihua-api.harmony-dev.com/api/feedback/detail',
        method: 'POST',
        header: {
          Authorization: uni.getStorageSync('token'),
          Server: true
        },
        data: {
          id: options.id
        },
        success: (res) => {
          if (res.data.code !== 1) {
            // 报错
            uni.showToast({
              title: res.data.msg || '获取数据失败',
              icon: 'none'
            })
            return;
          }
          this.feedbackData = res.data.data;
          uni.request({
        header: {
          Authorization: uni.getStorageSync('token'),
          Server: true
        },
        url: 'http://youcaihua-api.harmony-dev.com/api/seed/detail',
        method: 'POST',
        data: {
          id: ''+ this.feedbackData.pid // 假设ID是从页面参数中获取的
        },
        success: (res) => {
          if (res.data.code !== 1) {
            // 报错
            uni.showToast({
              title: res.data.msg || '获取数据失败',
              icon: 'none'
            })
            return;
          }
          else if (res.data.data === null) {
            // 报错
            uni.showToast({
              title: '获取数据为空',
              icon: 'none'
            })
          }
          this.feedbackData.image = res.data.data.image;
          this.feedbackData.oil = res.data.data.res.oil;
          this.feedbackData.protein = res.data.data.res.protein;
        }
      })
        }
      })
      // console.log('Feedback data:', this.feedbackData);
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },

    // 获取评分文字描述
    getRatingLabel(rating) {
      const labels = ['', '很不准确', '不太准确', '一般', '比较准确', '非常准确'];
      return labels[rating] || '';
    },

    // 将时间戳转换为日期格式
    formatTimestamp(timestamp) {
      if (!timestamp) return '未知';

      // 将时间戳转换为毫秒
      const date = new Date(timestamp * 1000);

      // 格式化日期
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },

    // 预览图片
    previewImage(imageUrl) {
      if (!imageUrl) return;

      // 使用uni-app的预览图片API
      uni.previewImage({
        urls: [imageUrl], // 需要预览的图片链接列表
        current: imageUrl, // 当前显示图片的链接
        indicator: 'default',
        loop: false
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

/* 顶部导航栏 */
.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  background-color: #4CAF50;
  color: white;
  padding: 0 15px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left, .nav-right {
  width: 60px;
  display: flex;
  align-items: center;
}

.nav-left {
  justify-content: flex-start;
}

.nav-right {
  justify-content: flex-end;
}

.back-button {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 18px;
  font-weight: bold;
}

.nav-title {
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
}

/* 反馈内容区域 */
.feedback-container {
  flex: 1;
  padding: 15px;
}

/* 样本预览 */
.sample-preview {
  display: flex;
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.sample-image {
  width: 70px;
  height: 70px;
  border-radius: 4px;
  background-color: #e0f2e0;
  object-fit: cover;
  cursor: pointer; /* 添加手型光标提示可点击 */
}

.sample-info {
  flex: 1;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-row {
  display: flex;
  margin-bottom: 4px;
}

.info-label {
  color: #666;
  font-size: 13px;
  width: 80px;
}

.info-value {
  color: #333;
  font-size: 13px;
  font-weight: 500;
}

.quality-badge {
  align-self: flex-start;
  background-color: #4CAF50;
  color: white;
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 10px;
  margin-top: 4px;
}

/* 反馈部分通用样式 */
.feedback-section {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.section-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
}

/* 详情内容 */
.detail-content {
  padding: 5px 0;
}

.detail-item {
  display: flex;
  margin-bottom: 8px;
  align-items: center;
}

.detail-label {
  color: #666;
  font-size: 14px;
  width: 90px;
}

.detail-value {
  color: #333;
  font-size: 14px;
  flex: 1;
}

.detail-text {
  color: #333;
  font-size: 14px;
  line-height: 1.5;
}

/* 评分区域 */
.rating-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.rating-star {
  margin: 0 8px;
  opacity: 0.3;
}

.rating-star.active {
  opacity: 1;
}

.star-icon {
  font-size: 28px;
  color: #4CAF50;
}

.rating-text {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}
</style>
