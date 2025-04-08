<template>
  <view class="page-container">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="back-btn" @click="goBack">
        <image src="/static/icons/back.svg" class="back-icon"></image>
      </view>
      <view class="header-title">意见反馈</view>
    </view>

    <!-- 反馈表单 -->
    <view class="feedback-form">
      <!-- 反馈类型 -->
      <view class="form-section">
        <view class="section-title">反馈类型</view>
        <view class="type-list">
          <view 
            v-for="(type, index) in feedbackTypes" 
            :key="index"
            class="type-item"
            :class="{ active: selectedType === type.value }"
            @click="selectedType = type.value"
          >
            <text>{{ type.label }}</text>
          </view>
        </view>
      </view>

      <!-- 问题描述 -->
      <view class="form-section">
        <view class="section-title">问题描述</view>
        <textarea
          v-model="feedbackContent"
          class="feedback-textarea"
          placeholder="请详细描述您遇到的问题或建议"
          maxlength="500"
        ></textarea>
        <view class="word-count">{{ feedbackContent.length }}/500</view>
      </view>

      <!-- 应用评分 -->
      <view class="form-section">
        <view class="section-title">应用评分</view>
        <view class="rating-container">
          <view 
            v-for="star in 5" 
            :key="star"
            class="star"
            :class="{ active: star <= rating }"
            @click="rating = star"
          >
            <image 
              :src="star <= rating ? '/static/icons/star-filled.svg' : '/static/icons/star-outline.svg'"
              class="star-icon"
            ></image>
          </view>
        </view>
      </view>

      <!-- 联系方式 -->
      <view class="form-section">
        <view class="section-title">联系方式（选填）</view>
        <input
          v-model="contactInfo"
          class="contact-input"
          placeholder="请输入您的联系方式，方便我们及时回复"
        />
      </view>

      <!-- 图片上传 -->
      <view class="form-section">
        <view class="section-title">上传图片（选填）</view>
        <view class="upload-container">
          <view 
            v-for="(image, index) in uploadedImages" 
            :key="index"
            class="image-preview"
          >
            <image :src="image" mode="aspectFill" class="preview-image"></image>
            <view class="delete-btn" @click="removeImage(index)">
              <image src="/static/icons/close.svg" class="delete-icon"></image>
            </view>
          </view>
          <view 
            v-if="uploadedImages.length < 3"
            class="upload-btn"
            @click="chooseImage"
          >
            <image src="/static/icons/camera.svg" class="camera-icon"></image>
            <text>上传图片</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 提交按钮 (悬浮) -->
    <view class="submit-section">
      <button 
        class="submit-btn"
        :class="{ disabled: !isFormValid }"
        @click="submitFeedback"
      >
        提交反馈
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 反馈类型选项
      feedbackTypes: [
        { label: '功能建议', value: 'suggestion' },
        { label: '问题反馈', value: 'bug' },
        { label: '使用咨询', value: 'question' },
        { label: '其他', value: 'other' }
      ],
      selectedType: 'suggestion', // 默认选中第一个类型
      feedbackContent: '', // 反馈内容
      rating: 5, // 默认5星
      contactInfo: '', // 联系方式
      uploadedImages: [] // 上传的图片
    }
  },
  computed: {
    // 表单验证
    isFormValid() {
      return this.feedbackContent.trim().length > 0
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    // 选择图片
    chooseImage() {
      uni.chooseImage({
        count: 3 - this.uploadedImages.length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.uploadedImages = [...this.uploadedImages, ...res.tempFilePaths]
        }
      })
    },
    // 删除图片
    removeImage(index) {
      this.uploadedImages.splice(index, 1)
    },
    // 提交反馈
    submitFeedback() {
      if (!this.isFormValid) return

      // 显示加载中
      uni.showLoading({
        title: '提交中...'
      })

      // TODO: 实际项目中需要调用后端API
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            // 延迟返回上一页
            setTimeout(() => {
              uni.navigateBack()
            }, 2000)
          }
        })
      }, 1500)
    }
  }
}
</script>

<style>
.page-container {
  min-height: 100vh;
  background-color: var(--bg-page);
  padding-bottom: 80px; /* 为悬浮按钮留出空间 */
  position: relative;
}

.page-header {
  background-color: var(--primary-color);
  padding: 20px;
  color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-btn {
  position: absolute;
  left: 15px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  width: 24px;
  height: 24px;
  color: #fff;
}

.header-title {
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.feedback-form {
  padding: 15px;
}

.form-section {
  background-color: var(--bg-card);
  border-radius: var(--border-radius-md);
  padding: 15px;
  margin-bottom: 15px;
}

.section-title {
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 10px;
  font-weight: 500;
}

.type-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.type-item {
  padding: 8px 15px;
  border-radius: var(--border-radius-sm);
  background-color: var(--bg-page);
  color: var(--text-secondary);
  font-size: 14px;
}

.type-item.active {
  background-color: var(--primary-color);
  color: #fff;
}

.feedback-textarea {
  width: 100%;
  height: 120px;
  background-color: var(--bg-page);
  border-radius: var(--border-radius-sm);
  padding: 10px;
  font-size: 14px;
  color: var(--text-primary);
}

.word-count {
  text-align: right;
  font-size: 12px;
  color: var(--text-hint);
  margin-top: 5px;
}

.rating-container {
  display: flex;
  gap: 10px;
}

.star {
  width: 30px;
  height: 30px;
}

.star-icon {
  width: 100%;
  height: 100%;
}

.contact-input {
  width: 100%;
  height: 40px;
  background-color: var(--bg-page);
  border-radius: var(--border-radius-sm);
  padding: 0 10px;
  font-size: 14px;
  color: var(--text-primary);
}

.upload-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-preview {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-icon {
  width: 12px;
  height: 12px;
}

.upload-btn {
  width: 80px;
  height: 80px;
  background-color: var(--bg-page);
  border-radius: var(--border-radius-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.camera-icon {
  width: 24px;
  height: 24px;
}

.upload-btn text {
  font-size: 12px;
  color: var(--text-secondary);
}

.submit-section {
  padding: 0 15px;
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  z-index: 100;
}

.submit-btn {
  width: 92%;
  height: 44px;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: var(--border-radius-md);
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.submit-btn.disabled {
  background-color: var(--disabled-bg);
  color: var(--disabled-text);
}
</style> 