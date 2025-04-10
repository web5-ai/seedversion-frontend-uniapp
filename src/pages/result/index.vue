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
        <image :src="analysisResult.image" mode="aspectFill" class="sample-image" />
      </view>
    </view>

    <!-- 采集信息区域 -->
    <view class="info-section">
      <view class="section-header">
        <text class="section-title">采集信息</text>
        <view v-if="!isEditing" class="edit-button" @click="startEditing">编辑</view>
        <view v-if="isEditing" class="edit-button-group">
          <view class="save-button" @click="saveInfo">保存</view>
          <view class="cancel-button" @click="cancelEditing">取消</view>
        </view>
      </view>
      <view class="info-content">
        <view class="info-item">
          <text class="info-label">地点：</text>
          <view v-if="!isEditing" class="info-value">{{ saveData.location }}</view>
          <input v-if="isEditing" v-model="saveData.location" class="info-input" />
        </view>
        <view class="info-item">
          <text class="info-label">品种：</text>
          <view v-if="!isEditing" class="info-value">{{ saveData.variety }}</view>
          <input v-if="isEditing" v-model="saveData.variety" class="info-input" />
        </view>
        <view class="info-item">
          <text class="info-label">批次：</text>
          <view v-if="!isEditing" class="info-value">{{ saveData.batchNumber }}</view>
          <input v-if="isEditing" v-model="saveData.batchNumber" class="info-input" />
        </view>
        <view class="info-item">
          <text class="info-label">采集日期：</text>
          <view v-if="!isEditing" class="info-value">{{ saveData.collectionDate }}</view>
          <input v-if="isEditing" v-model="saveData.collectionDate" class="info-input" />
        </view>
        <view class="info-item">
          <text class="info-label">种植方式：</text>
          <view v-if="!isEditing" class="info-value">{{ saveData.plantingMethod || '--' }}</view>
          <input v-if="isEditing" v-model="saveData.plantingMethod" class="info-input" />
        </view>
        <view class="info-item">
          <text class="info-label">收割方式：</text>
          <view v-if="!isEditing" class="info-value">{{ saveData.harvestMethod || '--' }}</view>
          <input v-if="isEditing" v-model="saveData.harvestMethod" class="info-input" />
        </view>
      </view>
    </view>

    <!-- 模型选择区域 -->
    <view class="model-section">
      <view class="model-picker-container">
        <text class="section-title">模型选择</text>
        <picker :range="models" @change="onModelChange">
          <view class="picker">
            <text>{{ selectedModel }}</text>
            <text class="arrow-down">▼</text>
          </view>
        </picker>
      </view>
    </view>

    <!-- 主要成分含量 -->
    <view class="result-section">
      <view class="section-header">
        <text class="section-title">主要成分含量</text>
      </view>
      <view class="result-chart">
        <!-- 修改循环遍历的数据 -->
        <view v-for="(field, index) in ['oil', 'protein']" :key="index" class="chart-item">
          <view class="chart-label">{{ field === 'oil' ? '油脂' : '蛋白质' }}</view>
          <view class="chart-bar-container">
            <view class="chart-bar" :style="{ width: analysisResult.res[field] + '%' }">
              <text class="chart-value">{{ analysisResult.res[field] }}</text>
            </view>
          </view>
        </view>
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
      // 修改为新的模型列表
      models: ['MPViT', 'ResNet', 'FasterNet', 'EfficientNet', 'Swin', 'VanillaNet'],
      // 模型选择
      selectedModel: 'FasterNet', // 默认选择 ResNet
      // 样本数据
      saveData: {
        id: 'S20230325001',
        imagePath: '/static/images/canola.jpg',
        location: '湖北荆州',
        variety: '双低油菜',
        batchNumber: 'B20231225-001',
        collectionDate: '2023-3-25',
        plantingMethod: '',
        harvestMethod: ''
      },
      isLoading: true,
      analysisResult: null,
      isEditing: false, // 编辑状态标识
      originalSampleData: {} // 保存原始数据，用于取消编辑时恢复
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
        urls: [this.saveData.imagePath],
        current: this.saveData.imagePath
      });
    },

    // 开始编辑
    startEditing() {
      this.isEditing = true;
      this.originalSampleData = { ...this.saveData }; // 保存原始数据
    },

    // 保存信息
    saveInfo() {
      uni.request({
        url: 'api/seed/save',
        method: 'POST',
        data: {
          id: this.analysisResult.id, // 假设ID是从结果中获取的
          type: this.saveData.variety, // 假设类型是从结果中获取的
          address: this.saveData.location, // 假设地址是从结果中获取的
          planting_way: this.saveData.plantingMethod, // 假设种植方式是从结果中获取的
          harvest_way: this.saveData.harvestMethod, // 假设收割方式是从结果中获取的
        },
        header: {
          Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NDM1NTcwMTQsInVpZCI6MX0.z3eLia-Kr_7LxV_y1ZzAmFZ1EBbnKmoPiWNDYTSWL_U', 
          Server: true
        },
        success: (res) => {
            uni.showToast({
              title: '保存成功',
              icon: 'success'
            });
            this.isEditing = false;
        },
        fail: (err) => {
          uni.showToast({
            title: '请求失败',
            icon: 'none'
          });
        }
      });
    },

    // 取消编辑
    cancelEditing() {
      this.saveData = { ...this.originalSampleData }; // 恢复原始数据
      this.isEditing = false;
    },

    onModelChange(e) {
      this.selectedModel = this.models[e.detail.value];
      // 调用原来的选择模型逻辑
      this.selectModel();
    },
    // 选择模型
    selectModel() {
      // 显示加载中
      uni.showLoading({
        title: '重新分析中...'
      });
      setTimeout(() => {
        uni.hideLoading(); 
      }, 500);

    },

    // 跳转到反馈页面
    saveReport() {
      // 跳转到反馈页面，传入记录ID
      uni.navigateTo({
        url: `/pages/feedback/index?recordId=${this.saveData.id}`
      });
    },
    simulateLoadingResult() {
      // 如果有缓存的分析结果，直接加载
      this.analysisResult = uni.getStorageSync('current_analysis_result');
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

.model-picker-container {
  display: flex;
  padding: 25px;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.picker {
  padding: 10px;
  font-size: 14px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f0f0f0; /* 添加边框以便区分 */
  border-radius: 5px; /* 圆角边框 */
  width: 100px; /* 设置宽度 */
}

.arrow-down {
  font-size: 12px;
  color: #999;
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

.edit-button-group {
  display: flex;
}

.save-button {
  color: #4CAF50;
  font-size: 13px;
  margin-right: 10px;
}

.cancel-button {
  color: #999;
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

.info-input {
  flex: 1;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  padding: 5px;
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