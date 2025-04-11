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
        <!-- 修改为新的图片路径 -->
        <image :src="result.data.data.image" mode="aspectFit" class="sample-image" />
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
          <view v-if="!isEditing" class="info-value">{{ result.data.data.address || '--' }}</view>
          <input v-if="isEditing" v-model="result.data.data.address" class="info-input" />
        </view>
        <view class="info-item">
          <text class="info-label">品种：</text>
          <view v-if="!isEditing" class="info-value">{{ result.data.data.type || '--' }}</view>
          <input v-if="isEditing" v-model="result.data.data.type" class="info-input" />
        </view>
        <view class="info-item">
          <text class="info-label">批次：</text>
          <view v-if="!isEditing" class="info-value">{{ result.data.data.batch_no }}</view>
          <input v-if="isEditing" v-model="result.data.data.batch_no" class="info-input" />
        </view>
        <view class="info-item">
          <text class="info-label">种植方式：</text>
          <view v-if="!isEditing" class="info-value">{{ result.data.data.planting_way || '--' }}</view>
          <input v-if="isEditing" v-model="result.data.data.planting_way" class="info-input" />
        </view>
        <view class="info-item">
          <text class="info-label">收割方式：</text>
          <view v-if="!isEditing" class="info-value">{{ result.data.data.harvest_way || '--' }}</view>
          <input v-if="isEditing" v-model="result.data.data.harvest_way" class="info-input" />
        </view>
      </view>
    </view>

    <!-- 模型信息区域 -->
    <view class="model-section">
      <view class="section-header">
        <text class="section-title">使用模型</text>
      </view>
      <view class="info-content">
        <view class="info-item">
          <text class="info-label">模型：</text>
          <view class="info-value">{{ result.data.data.mod }}</view>
        </view>
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
            <!-- 修改为新的含量数据 -->
            <view class="chart-bar" :style="{ width: result.data.data.res[field] + '%' }">
              <text class="chart-value">{{ result.data.data.res[field] }}</text>
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
      // 样本数据
      result: {},
      isLoading: true,
      isEditing: false, // 编辑状态标识
      originalSampleData: {} // 保存原始数据，用于取消编辑时恢复
    };
  },
  onLoad(options) {
    // 从页面参数获取记录ID
    if (options.recordId) {
      // TODO: 实现从服务器获取检测记录详情
      
      // 发送请求/api/seed/detail
      uni.request({
        header: {
          Authorization: uni.getStorageSync('token'),
          Server: true
        },
        url: 'api/seed/detail',
        method: 'POST',
        data: {
          id: options.recordId // 假设ID是从页面参数中获取的
        },
        success: (res) => {
          this.result = res; // 更新 result 数据
          // oil protein数据取两位小数
          this.result.data.data.res.oil = this.result.data.data.res.oil.toFixed(2);
          this.result.data.data.res.protein = this.result.data.data.res.protein.toFixed(2);
          // for (let key in this.result.data.data) {
          //  console.log(key); 
          // }
        }
      })
    }
    else {
     console.error('未提供记录ID'); 
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
        urls: [this.result.data.data.image],
        current: this.result.data.data.image
      });
    },

    // 开始编辑
    startEditing() {
      this.isEditing = true;
      this.originalSampleData = { ...this.result.data.data }; // 保存原始数据
    },

    // 保存信息
    saveInfo() {
      uni.request({
        url: 'api/seed/save',
        method: 'POST',
        data: {
          id: this.result.data.data.id, // 假设ID是从结果中获取的
          type: this.result.data.data.type, // 假设类型是从结果中获取的
          address: this.result.data.data.address, // 假设地址是从结果中获取的
          planting_way: this.result.data.data.planting_way, // 假设种植方式是从结果中获取的
          harvest_way: this.result.data.data.harvest_way, // 假设收割方式是从结果中获取的
        },
        header: {
          Authorization: uni.getStorageSync('token'),
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
      this.result.data.data = { ...this.originalSampleData }; // 恢复原始数据
      this.isEditing = false;
    },

    // 跳转到反馈页面
    saveReport() {
      // 跳转到反馈页面，传入记录ID
      uni.setStorageSync('feedbackData', this.result.data.data);
      uni.navigateTo({
        url: `/pages/feedback/index?recordId=${this.result.data.data.id}`
      });
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
  padding: 0px; /* 增大内边距，使输入框内容有更多空间 */
  font-size: 20px; /* 增大字体大小 */
}

/* 模型信息区域 */
.model-section {
  background: white;
  margin-bottom: 10px;
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