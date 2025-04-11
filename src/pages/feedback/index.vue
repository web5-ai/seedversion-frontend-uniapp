<template>
  <view class="page-container">
    <!-- 顶部导航栏 -->
    <view class="navigation-bar">
      <view class="nav-left">
        <view class="back-button" @click="goBack">
          <text class="back-icon">&lt;</text>
        </view>
      </view>
      <view class="nav-title">提供反馈</view>
      <view class="nav-right"></view>
    </view>

    <!-- 反馈内容区域 -->
    <view class="feedback-container">
      <!-- 样本预览 -->
      <view class="sample-preview">
        <image :src="feedbackData.image" mode="aspectFill" class="sample-image" />
        <view class="sample-info">
          <view class="info-row">
            <text class="info-label">油脂含量:</text>
            <text class="info-value">{{ feedbackData.res.oil }}</text>
          </view>
          <view class="info-row">
            <text class="info-label">蛋白质含量:</text>
            <text class="info-value">{{ feedbackData.res.protein }}</text>
          </view>
          <view class="quality-badge">{{ feedbackData.quality }}</view>
        </view>
      </view>

      <!-- 反馈类型选择 -->
      <view class="feedback-section">
        <view class="section-title">反馈类型</view>
        <view class="feedback-options">
          <view 
            v-for="(option, index) in feedbackOptions" 
            :key="index"
            class="option-item"
            :class="{ active: selectedFeedback === index }"
            @click="selectFeedback(index)"
          >
            <view class="option-radio">
              <view class="radio-inner" v-if="selectedFeedback === index"></view>
            </view>
            <text class="option-text">{{ option.label }}</text>
          </view>
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
            :class="{ active: i <= accuracyRating }"
            @click="setRating(i)"
          >
            <text class="star-icon">★</text>
          </view>
        </view>
        <text class="rating-text">{{ getRatingLabel(accuracyRating) }}</text>
      </view>

      <!-- 实际成分信息 -->
      <view class="feedback-section" v-if="selectedFeedback === 1">
        <view class="section-title">实际成分信息（如有）</view>
        <view class="input-group">
          <view class="input-row">
            <text class="input-label">油脂含量:</text>
            <view class="input-container">
              <input type="digit" v-model="actualOil" class="input-field" placeholder="请输入实际油脂含量" />
              <text class="input-suffix">%</text>
            </view>
          </view>
          <view class="input-row">
            <text class="input-label">蛋白质含量:</text>
            <view class="input-container">
              <input type="digit" v-model="actualProtein" class="input-field" placeholder="请输入实际蛋白质含量" />
              <text class="input-suffix">%</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 详细反馈 -->
      <view class="feedback-section">
        <view class="section-title">详细说明（选填）</view>
        <textarea 
          class="feedback-textarea" 
          v-model="feedbackContent"
          placeholder="请详细描述您的反馈内容，以帮助我们提升检测准确性"
          maxlength="200"
        ></textarea>
        <view class="text-counter">{{ feedbackContent.length }}/200</view>
      </view>

      <!-- 联系方式 -->
      <view class="feedback-section">
        <view class="section-title">联系方式（选填）</view>
        <input 
          type="text" 
          v-model="contactInfo" 
          class="contact-input"
          placeholder="留下您的联系方式，我们可能会联系您了解更多信息"
        />
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="submit-container">
      <button 
        class="submit-button" 
        :disabled="!isValidFeedback"
        :class="{ disabled: !isValidFeedback }"
        @click="submitFeedback"
      >提交反馈</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      feedbackData: {}, // 从上一页传来的数据
      feedbackOptions: [
        { label: '结果准确', value: 'accurate' },
        { label: '结果不准确', value: 'inaccurate' },
        { label: '功能建议', value: 'feature' },
        { label: '界面体验', value: 'ui' },
        { label: '其他问题', value: 'other' }
      ],
      selectedFeedback: 0,        // 选中的反馈类型索引
      accuracyRating: 0,          // 准确性评分 (1-5)
      feedbackContent: '',        // 反馈内容
      actualOil: '',              // 实际油脂含量
      actualProtein: '',          // 实际蛋白质含量
      contactInfo: ''             // 联系方式
    }
  },
  computed: {
    // 验证反馈是否有效
    isValidFeedback() {
      return this.selectedFeedback !== null && this.accuracyRating > 0;
    }
  },
  onLoad(options) {
    // 获取上一页传递的数据
    if (options.recordId) {
      this.feedbackData = uni.getStorageSync('feedbackData');
      console.log('Feedback data:', this.feedbackData);
      // /api/feedback/detail
      uni.request({
        url: 'api/feedback/detail',
        method: 'POST',
        data: { id: options.recordId }, 
        header: {
          Authorization: uni.getStorageSync('token'),
          Server: true // 服务器端接收的字段名 
        }
      })
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    
    // 选择反馈类型
    selectFeedback(index) {
      this.selectedFeedback = index;
    },
    
    // 设置评分
    setRating(rating) {
      this.accuracyRating = rating;
    },
    
    // 获取评分文字描述
    getRatingLabel(rating) {
      const labels = ['', '很不准确', '不太准确', '一般', '比较准确', '非常准确'];
      return labels[rating] || '';
    },

    // 提交反馈
    async submitFeedback() {
      if (!this.isValidFeedback) return;

      try {
        uni.showLoading({ title: '提交中...' });

        const feedbackData = {
          id: this.feedbackData.id,                                    // 记录ID
          score: this.accuracyRating,                                 // 评分
          types: this.feedbackOptions[this.selectedFeedback].value,   // 反馈类型值
          types_msg: this.feedbackOptions[this.selectedFeedback].label, // 反馈类型文字
          detail: this.buildDetailContent(),                          // 详细内容
          images: [this.feedbackData.image]                           // 图片URL数组
        };

        const res = await uni.request({
          url: '/api/feedback/add',
          method: 'POST',
          data: feedbackData,
          header: {
            Authorization: uni.getStorageSync('token'),
            Server: true
          }
        });

        uni.hideLoading();

        if (res.data.code === 1) {
          uni.showToast({
            title: '反馈提交成功',
            icon: 'success',
            duration: 2000
          });
          
          setTimeout(() => uni.navigateBack(), 2000);
        } else {
          throw new Error(res.data.msg || '提交失败');
        }

      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: error.message || '提交失败',
          icon: 'none'
        });
      }
    },

    // 构建详细反馈内容
    buildDetailContent() {
      let detail = this.feedbackContent;

      // 如果是"结果不准确"且填写了实际值，添加到详细内容中
      if (this.selectedFeedback === 1) {
        if (this.actualOil || this.actualProtein) {
          detail += '\n\n实际数据：';
          if (this.actualOil) detail += `\n油脂含量: ${this.actualOil}%`;
          if (this.actualProtein) detail += `\n蛋白质含量: ${this.actualProtein}%`;
        }
      }

      if (this.contactInfo) {
        detail += `\n\n联系方式: ${this.contactInfo}`;
      }

      return detail;
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

/* 反馈选项 */
.feedback-options {
  display: flex;
  flex-direction: column;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.option-item:last-child {
  border-bottom: none;
}

.option-radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #ddd;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.option-item.active .option-radio {
  border-color: #4CAF50;
}

.radio-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #4CAF50;
}

.option-text {
  font-size: 14px;
  color: #333;
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

/* 输入框 */
.input-group {
  display: flex;
  flex-direction: column;
}

.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-label {
  width: 90px;
  font-size: 14px;
  color: #666;
}

.input-container {
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0 10px;
  height: 36px;
}

.input-field {
  flex: 1;
  height: 36px;
  font-size: 14px;
}

.input-suffix {
  color: #999;
  font-size: 14px;
  margin-left: 5px;
}

/* 文本域 */
.feedback-textarea {
  width: 100%;
  height: 100px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.text-counter {
  text-align: right;
  font-size: 12px;
  color: #999;
}

/* 联系方式 */
.contact-input {
  width: 100%;
  height: 36px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 14px;
  color: #333;
}

/* 提交按钮 */
.submit-container {
  padding: 15px;
  position: sticky;
  bottom: 0;
  background-color: #f5f5f5;
}

.submit-button {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background-color: #4CAF50;
  color: white;
  border-radius: 22px;
  font-size: 16px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.submit-button.disabled {
  background-color: #cccccc;
  color: #ffffff;
}
</style> 
