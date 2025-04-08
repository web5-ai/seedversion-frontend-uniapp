<template>
  <view class="page-container">
    <!-- 顶部导航栏 -->
    <view class="navigation-bar">
      <view class="nav-left">
        <view class="back-button" @click="goBack">
          <text class="back-icon">&lt;</text>
        </view>
      </view>
      <view class="nav-title">油菜籽成分分析结果</view>
      <view class="nav-right">
        <view class="share-button" @click="shareResult">分享</view>
      </view>
    </view>

    <!-- 样本图片区域 -->
    <view class="sample-section">
      <view class="sample-title">
        <text>样本图片</text>
        <text class="view-full" @click="viewFullImage">点击查看原图</text>
      </view>
      <view class="sample-image-container">
        <image :src="sampleData.imagePath" mode="aspectFill" class="sample-image" />
      </view>
    </view>

    <!-- 采集信息区域 -->
    <view class="info-section">
      <view class="section-header">
        <text class="section-title">采集信息</text>
        <view class="edit-button" @click="editInfo">编辑</view>
      </view>
      <view class="info-content">
        <view class="info-item">
          <text class="info-label">地点：</text>
          <text class="info-value">{{ sampleData.location }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">品种：</text>
          <text class="info-value">{{ sampleData.variety }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">批次：</text>
          <text class="info-value">{{ sampleData.batchNumber }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">采集日期：</text>
          <text class="info-value">{{ sampleData.collectionDate }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">种植方式：</text>
          <text class="info-value">{{ sampleData.plantingMethod || '--' }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">收割方式：</text>
          <text class="info-value">{{ sampleData.harvestMethod || '--' }}</text>
        </view>
      </view>
    </view>

    <!-- 模型选择区域 -->
    <view class="model-section">
      <view class="section-header">
        <text class="section-title">模型选择</text>
      </view>
      <view class="model-options">
        <view class="model-option" :class="{ active: selectedModel === 'resnet' }" @click="selectModel('resnet')">
          <view class="model-radio">
            <view class="radio-inner" v-if="selectedModel === 'resnet'"></view>
          </view>
          <text class="model-name">Resnet</text>
        </view>
        <view class="model-option" :class="{ active: selectedModel === 'vgg' }" @click="selectModel('vgg')">
          <view class="model-radio">
            <view class="radio-inner" v-if="selectedModel === 'vgg'"></view>
          </view>
          <text class="model-name">Vgg</text>
        </view>
        <view class="model-option" :class="{ active: selectedModel === 'fastnet' }" @click="selectModel('fastnet')">
          <view class="model-radio">
            <view class="radio-inner" v-if="selectedModel === 'fastnet'"></view>
          </view>
          <text class="model-name">Fastnet</text>
        </view>
      </view>
    </view>

    <!-- 主要成分含量 -->
    <view class="result-section">
      <view class="section-header">
        <text class="section-title">主要成分含量</text>
      </view>
      <view class="result-chart">
        <view v-for="(item, index) in components" :key="index" class="chart-item">
          <view class="chart-label">{{ item.name }}</view>
          <view class="chart-bar-container">
            <view class="chart-bar" :style="{ width: item.percentage + '%' }">
              <text class="chart-value">{{ item.value }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 分析结论 -->
    <view class="conclusion-section">
      <view class="section-header">
        <text class="section-title">分析结论</text>
      </view>
      <view class="conclusion-content">
        <text class="conclusion-text">{{ analysis.conclusion }}</text>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="footer-action">
      <button class="action-button" @click="saveReport">提供反馈</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 模型选择
      selectedModel: 'vgg',
      // 样本数据
      sampleData: {
        id: 'S20230325001',
        imagePath: '/static/images/canola.jpg',
        location: '湖北荆州',
        variety: '双低油菜',
        batchNumber: 'B20231225-001',
        collectionDate: '2023-3-25',
        plantingMethod: '',
        harvestMethod: ''
      },
      // 成分数据
      components: [
        { name: '油酸', value: '42.8%', percentage: 85.6 },
        { name: '亚油酸', value: '23.5%', percentage: 47 },
        { name: '亚麻酸', value: '12.3%', percentage: 24.6 },
        { name: '棕榈酸', value: '8.7%', percentage: 17.4 },
        { name: '硬脂酸', value: '7.9%', percentage: 15.8 }
      ],
      // 分析结论
      analysis: {
        conclusion: '该样本油酸含量较高，品质较好适合加工高品质食用油',
        quality: '优',
        recommendation: '适合加工高品质食用油'
      },
      isLoading: true,
      analysisResult: null
    };
  },
  onLoad(options) {
    // 从页面参数获取记录ID
    if (options.recordId) {
      // TODO: 实现从服务器获取检测记录详情
      // 在实际项目中，这里应该调用API获取检测结果
      // 这里使用随机数据模拟
      this.simulateLoadingResult();
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    
    // 分享结果
    shareResult() {
      uni.showActionSheet({
        itemList: ['分享到微信', '保存图片', '复制链接'],
        success: (res) => {
          // TODO: 实现分享功能
          uni.showToast({
            title: '分享功能开发中',
            icon: 'none'
          });
        }
      });
    },
    
    // 查看原图
    viewFullImage() {
      uni.previewImage({
        urls: [this.sampleData.imagePath],
        current: this.sampleData.imagePath
      });
    },
    
    // 编辑采集信息
    editInfo() {
      uni.showModal({
        title: '提示',
        content: '编辑功能开发中',
        showCancel: false
      });
    },
    
    // 选择模型
    selectModel(model) {
      if (this.selectedModel === model) return;
      
      this.selectedModel = model;
      
      // 显示加载中
      uni.showLoading({
        title: '重新分析中...'
      });
      
      // 模拟不同模型的分析结果
      setTimeout(() => {
        if (model === 'resnet') {
          this.components[0].value = '41.2%';
          this.components[0].percentage = 82.4;
          this.components[1].value = '24.1%';
          this.components[1].percentage = 48.2;
        } else if (model === 'vgg') {
          this.components[0].value = '42.8%';
          this.components[0].percentage = 85.6;
          this.components[1].value = '23.5%';
          this.components[1].percentage = 47;
        } else if (model === 'fastnet') {
          this.components[0].value = '43.5%';
          this.components[0].percentage = 87;
          this.components[1].value = '22.9%';
          this.components[1].percentage = 45.8;
        }
        
        uni.hideLoading();
      }, 1000);
    },
    
    // 跳转到反馈页面
    saveReport() {
      // 跳转到反馈页面，传入记录ID
      uni.navigateTo({
        url: `/pages/feedback/index?recordId=${this.sampleData.id}`
      });
    },
    simulateLoadingResult() {
      // 如果有缓存的分析结果，直接加载
      const cachedResult = uni.getStorageSync('lastAnalysisResult');
      if (cachedResult) {
        this.analysisResult = JSON.parse(cachedResult);
        this.isLoading = false;
      }
    }
  }
}
</script>

<style>
/* 页面容器 */
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 80px;
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

.share-button {
  font-size: 15px;
}

/* 样本图片区域 */
.sample-section {
  margin: 10px 0;
  background: white;
}

.sample-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
}

.view-full {
  color: #4CAF50;
  font-size: 13px;
}

.sample-image-container {
  height: 180px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.sample-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 信息区域 */
.info-section {
  background: white;
  margin-bottom: 10px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.edit-button {
  color: #4CAF50;
  font-size: 13px;
}

.info-content {
  padding: 15px;
}

.info-item {
  display: flex;
  margin-bottom: 10px;
}

.info-label {
  width: 90px;
  color: #666;
  font-size: 14px;
}

.info-value {
  flex: 1;
  color: #333;
  font-size: 14px;
}

/* 模型选择区域 */
.model-section {
  background: white;
  margin-bottom: 10px;
}

.model-options {
  display: flex;
  padding: 15px;
}

.model-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.model-radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #ddd;
  margin-right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.model-option.active .model-radio {
  border-color: #4CAF50;
}

.radio-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #4CAF50;
}

.model-name {
  font-size: 14px;
  color: #333;
}

/* 结果图表区域 */
.result-section {
  background: white;
  margin-bottom: 10px;
}

.result-chart {
  padding: 15px;
}

.chart-item {
  margin-bottom: 12px;
}

.chart-label {
  margin-bottom: 6px;
  font-size: 14px;
  color: #666;
}

.chart-bar-container {
  height: 24px;
  background-color: #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.chart-bar {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  transition: width 0.3s ease;
}

.chart-value {
  color: white;
  font-size: 13px;
  font-weight: 500;
}

/* 结论区域 */
.conclusion-section {
  background: white;
  margin-bottom: 10px;
}

.conclusion-content {
  padding: 15px;
}

.conclusion-text {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

/* 底部按钮 */
.footer-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 15px;
  background-color: white;
  box-shadow: 0 -1px 6px rgba(0,0,0,0.1);
}

.action-button {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background-color: #4CAF50;
  color: white;
  border-radius: 6px;
  font-size: 16px;
  text-align: center;
}
</style> 