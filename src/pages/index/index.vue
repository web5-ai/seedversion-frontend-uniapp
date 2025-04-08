<template>
  <view class="page-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="header-title">油菜籽成分检测系统</text>
    </view>
    
    <!-- 主体内容区 -->
    <view class="content">
      <!-- 拍照上传区域 -->
      <view class="upload-area" @click="handleUpload">
        <view class="upload-box">
          <view class="camera-icon">
            <image src="/static/icons/camera.svg" mode="aspectFit" class="icon-text" alt="相机图标"></image>
          </view>
          <text class="upload-text">点击拍照或上传照片</text>
        </view>
      </view>
      
      <!-- 最近检测 -->
      <view class="recent-section">
        <text class="section-title">最近检测</text>
        
        <!-- 使用记录列表组件 -->
        <record-list 
          :records="recentRecords" 
          @item-click="viewDetail"
          empty-text="暂无检测记录"
        />
        
        <!-- 使用提示 -->
        <view class="tips-section">
          <text class="tip-text">使用提示：请确保光线充足</text>
          <text class="tip-text">图片完整清晰</text>
        </view>
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
      // 最近检测记录
      recentRecords: [
        {
          id: '001',
          date: '2023-12-25',
          image: '/static/images/canola.svg',
          oilAcid: '42.8%',
          linoleicAcid: '23.5%',
          quality: '优'
        },
        {
          id: '002',
          date: '2023-12-25',
          image: '/static/images/canola.svg',
          oilAcid: '42.8%',
          linoleicAcid: '23.5%',
          quality: '优'
        }
      ],
      // 当前选择图片的来源（camera-相机拍照，album-相册选择）
      currentSource: 'camera'
    }
  },
  onLoad() {
    // 页面加载时的逻辑
    this.checkPermissions();
    
    // 监听添加检测记录事件
    uni.$on('addDetectionRecord', this.addDetectionRecord);
  },
  onUnload() {
    // 页面卸载时移除事件监听
    uni.$off('addDetectionRecord', this.addDetectionRecord);
  },
  methods: {
    // 添加检测记录
    addDetectionRecord(record) {
      // 添加到检测结果列表
      this.recentRecords.unshift(record);
      
      // 限制列表长度
      if (this.recentRecords.length > 5) {
        this.recentRecords.pop();
      }
    },
    
    // 检查相机和存储权限
    checkPermissions() {
      // #ifdef APP-PLUS || MP
      uni.authorize({
        scope: 'scope.camera',
        success: () => {
          console.log('相机权限已获取');
        },
        fail: () => {
          uni.showToast({
            title: '请允许使用相机权限',
            icon: 'none'
          });
        }
      });
      // #endif
    },
    
    // 处理上传照片
    handleUpload() {
      uni.showActionSheet({
        itemList: ['拍照', '从相册选择'],
        success: res => {
          if (res.tapIndex === 0) {
            // 拍照
            this.takePhoto();
          } else if (res.tapIndex === 1) {
            // 从相册选择
            this.chooseFromAlbum();
          }
        }
      });
    },
    
    // 拍照
    takePhoto() {
      // 记录来源
      this.currentSource = 'camera';
      
      uni.chooseImage({
        count: 1,
        sourceType: ['camera'],
        success: res => {
          const tempFilePath = res.tempFilePaths[0];
          this.uploadImage(tempFilePath);
        }
      });
    },
    
    // 从相册选择
    chooseFromAlbum() {
      // 记录来源
      this.currentSource = 'album';
      
      uni.chooseImage({
        count: 1,
        sourceType: ['album'],
        success: res => {
          const tempFilePath = res.tempFilePaths[0];
          this.uploadImage(tempFilePath);
        }
      });
    },
    
    // 上传图片
    uploadImage(filePath) {
      // 跳转到照片预览页面
      uni.navigateTo({
        url: `/pages/photo-preview/index?imagePath=${encodeURIComponent(filePath)}&source=${this.currentSource}`
      });
      
      // 以下代码注释掉，交由照片预览页面处理
      /*
      uni.showLoading({
        title: '正在分析...'
      });
      
      // TODO: 实际项目中这里应该调用上传API
      setTimeout(() => {
        uni.hideLoading();
        
        // 模拟检测结果
        const result = {
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          image: filePath,
          oilAcid: '42.8%',
          linoleicAcid: '23.5%',
          quality: '优'
        };
        
        // 添加到检测结果列表
        this.recentRecords.unshift(result);
        
        // 限制列表长度
        if (this.recentRecords.length > 5) {
          this.recentRecords.pop();
        }
        
        // 提示检测完成
        uni.showToast({
          title: '检测完成',
          icon: 'success'
        });
      }, 2000);
      */
    },
    
    // 查看详情
    viewDetail(record) {
      // 跳转到照片预览页面查看详情
      uni.navigateTo({
        url: `/pages/photo-preview/index?imagePath=${encodeURIComponent(record.image)}&source=detail&recordId=${record.id}`
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
  width: 100%;
}

/* 顶部标题栏 */
.header {
  background-color: #4CAF50;
  padding: 40px 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  width: 100%;
  box-sizing: border-box;
}

/* 拍照上传区域 */
.upload-area {
  margin-bottom: 20px;
}

.upload-box {
  height: 180px;
  border: 1px solid #e0f2e0;
  border-radius: 8px;
  background-color: #f0fff0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.camera-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: 50%;
}

.icon-text {
  width: 36px;
  height: 36px;
}

.upload-text {
  font-size: 16px;
  color: #666;
}

/* 最近检测区域 */
.recent-section {
  flex: 1;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
}

/* 提示区域 */
.tips-section {
  color: #999;
  font-size: 12px;
  line-height: 1.5;
}
</style> 