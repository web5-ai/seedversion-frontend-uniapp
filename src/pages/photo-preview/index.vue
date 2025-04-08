<template>
  <view class="page-container">
    <!-- 图片预览区域 -->
    <view class="preview-wrapper">
      <view class="preview-container">
        <image 
          :src="imagePath" 
          mode="aspectFit" 
          class="preview-image"
        />
        
        <!-- 检测中状态显示 -->
        <view v-if="analyzing" class="analyzing-overlay">
          <view class="analyzing-content">
            <view class="loading-icon">
              <text class="loading-dot"></text>
              <text class="loading-dot"></text>
              <text class="loading-dot"></text>
            </view>
            <text class="analyzing-text">正在分析...</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 拍照提示区域 -->
    <view class="photo-tips" v-if="!hasResult && source !== 'detail'">
      <view class="tips-header">
        <image src="/static/icons/info.svg" class="tip-icon" alt="提示图标" />
        <text class="tips-title">拍照注意事项</text>
      </view>
      
      <view class="tips-list">
        <view class="tip-item">
          <text class="tip-number">1</text>
          <text class="tip-text">光线充足：请在明亮环境下拍摄，避免阴影遮挡</text>
        </view>
        <view class="tip-item">
          <text class="tip-number">2</text>
          <text class="tip-text">取样完整：确保油菜籽在画面中完整显示且清晰可见</text>
        </view>
        <view class="tip-item">
          <text class="tip-number">3</text>
          <text class="tip-text">保持稳定：拍摄时请保持手机稳定，避免晃动模糊</text>
        </view>
        <view class="tip-item">
          <text class="tip-number">4</text>
          <text class="tip-text">背景单一：尽量选择纯色背景，减少干扰因素</text>
        </view>
      </view>
    </view>
    
    <!-- 检测结果区域 -->
    <view class="result-container" v-if="!analyzing && hasResult">
      <view class="result-card">
        <view class="result-header">
          <text class="result-title">检测结果</text>
          <text class="result-date">{{ formatDate(new Date()) }}</text>
        </view>
        
        <view class="result-content">
          <view class="result-item">
            <text class="item-label">油酸含量</text>
            <text class="item-value">{{ result.oilAcid }}</text>
          </view>
          <view class="result-item">
            <text class="item-label">亚油酸含量</text>
            <text class="item-value">{{ result.linoleicAcid }}</text>
          </view>
          <view class="result-item">
            <text class="item-label">品质评级</text>
            <text class="item-value quality-badge">{{ result.quality }}</text>
          </view>
        </view>
        
        <view class="result-footer">
          <text class="result-note">以上数据仅供参考，详细分析请咨询专业人士</text>
        </view>
      </view>
    </view>
    
    <!-- 操作按钮区域（悬浮） -->
    <view class="floating-action-container">
      <view class="action-buttons">
        <button 
          class="action-button cancel-button" 
          @click="handleCancel"
          :disabled="analyzing"
        >{{ source === 'detail' ? '返回' : '取消' }}</button>
        
        <button 
          v-if="!hasResult && source !== 'detail'"
          class="action-button confirm-button" 
          @click="handleAnalyze"
          :disabled="analyzing"
        >开始分析</button>
        
        <button 
          v-else-if="source !== 'detail'"
          class="action-button confirm-button" 
          @click="handleSave"
        >保存结果</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 图片路径
      imagePath: '',
      // 是否正在分析中
      analyzing: false,
      // 是否有检测结果
      hasResult: false,
      // 检测结果数据
      result: {
        oilAcid: '--',
        linoleicAcid: '--',
        quality: '--'
      },
      // 来源（camera-相机拍照，album-相册选择）
      source: 'camera',
      // 记录ID
      recordId: null
    }
  },
  onLoad(options) {
    // 从页面参数获取图片路径和来源
    if (options.imagePath) {
      this.imagePath = decodeURIComponent(options.imagePath);
    }
    
    if (options.source) {
      this.source = options.source;
    }
    
    // 如果是从详情页跳转过来
    if (this.source === 'detail' && options.recordId) {
      this.recordId = options.recordId;
      // 从全局状态或持久化存储中获取记录详情
      // 这里为了演示，直接模拟加载结果
      setTimeout(() => {
        this.result = {
          oilAcid: '42.8%',
          linoleicAcid: '23.5%',
          quality: '优'
        };
        this.hasResult = true;
      }, 500);
    }
  },
  methods: {
    // 格式化日期
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    
    // 开始分析图片
    handleAnalyze() {
      this.analyzing = true;
      
      // 模拟分析过程
      setTimeout(() => {
        // 模拟检测结果
        this.result = {
          oilAcid: '42.8%',
          linoleicAcid: '23.5%',
          quality: '优'
        };
        
        this.analyzing = false;
        this.hasResult = true;
      }, 3000);
      
      // TODO: 实际项目中这里应该调用分析API
    },
    
    // 保存检测结果
    handleSave() {
      // 创建检测记录
      const record = {
        id: Date.now().toString(),
        date: this.formatDate(new Date()),
        image: this.imagePath,
        oilAcid: this.result.oilAcid,
        linoleicAcid: this.result.linoleicAcid,
        quality: this.result.quality
      };
      
      // 发送事件，通知首页添加新记录
      uni.$emit('addDetectionRecord', record);
      
      // TODO: 保存到本地或上传到服务器
      
      uni.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          // 延迟返回首页
          setTimeout(() => {
            uni.navigateBack({
              delta: 1
            });
          }, 2000);
        }
      });
    },
    
    // 取消操作
    handleCancel() {
      uni.navigateBack({
        delta: 1
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
  width: 100%;
  position: relative;
  padding-bottom: 80px; /* 为悬浮按钮预留空间 */
}

/* 图片预览区域外层容器 */
.preview-wrapper {
  padding: 15px;
  height: 70vh;
}

/* 图片预览区域 */
.preview-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.preview-image {
  width: 92%;
  height: 92%;
  object-fit: contain;
}

/* 拍照提示区域 */
.photo-tips {
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  margin: 0 15px 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.tips-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.tip-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.tips-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.tips-list {
  display: flex;
  flex-direction: column;
}

.tip-item {
  display: flex;
  margin-bottom: 10px;
  align-items: flex-start;
}

.tip-number {
  width: 18px;
  height: 18px;
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  flex-shrink: 0;
}

.tip-text {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  flex: 1;
}

/* 分析中的遮罩和加载动画 */
.analyzing-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
}

.analyzing-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-icon {
  display: flex;
  margin-bottom: 15px;
}

.loading-dot {
  width: 12px;
  height: 12px;
  background-color: #ffffff;
  border-radius: 50%;
  margin: 0 5px;
  animation: loading 1.4s infinite ease-in-out both;
}

.loading-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loading {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.analyzing-text {
  color: #ffffff;
  font-size: 16px;
}

/* 检测结果区域 */
.result-container {
  padding: 15px;
  flex: 1;
}

.result-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 15px;
}

.result-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.result-date {
  font-size: 14px;
  color: #999999;
}

.result-content {
  margin-bottom: 20px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.item-label {
  font-size: 14px;
  color: #666666;
}

.item-value {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}

.quality-badge {
  background-color: #4CAF50;
  color: white;
  padding: 2px 12px;
  border-radius: 12px;
  font-size: 14px;
}

.result-footer {
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
}

.result-note {
  font-size: 12px;
  color: #999999;
  text-align: center;
  display: block;
}

/* 悬浮操作按钮区域 */
.floating-action-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 15px 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  backdrop-filter: blur(5px);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}

.action-button {
  flex: 1;
  height: 44px;
  line-height: 44px;
  text-align: center;
  border-radius: 22px;
  font-size: 16px;
  margin: 0 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.cancel-button {
  background-color: #f5f5f5;
  color: #666666;
  border: 1px solid #e0e0e0;
}

.confirm-button {
  background-color: #4CAF50;
  color: #ffffff;
}
</style> 