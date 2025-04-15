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
      recentRecords: [],
      permissions: [
        'android.permission.CAMERA',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.READ_EXTERNAL_STORAGE'
      ]
    }
  },
  onLoad() {
    this.requestPermissions();
    uni.request({
      url: 'http://youcaihua-api.harmony-dev.com/api/seed/index',
      method: 'POST',
      data: {
        page: 1,
        limit: 5,
      }, 
      header: {
        Authorization: uni.getStorageSync('token'),
        Server: true
      },
      success: (res) => {
        if (res.data.code !== 1) {
          uni.showToast({
            title: res.data.msg || '请求失败',
            icon: 'none'
          }); 
        }
       this.recentRecords = res.data.data.data;
      },
      fail: (err) => {
        console.error('请求失败', err); 
      }
    })
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
    
    // 请求权限
    requestPermissions() {
      plus.android.requestPermissions(
        this.permissions,
        (resultObj) => {
          let allGranted = true;
          for (var i = 0; i < resultObj.deniedPresent.length; i++) {
            console.log('拒绝本次申请权限：' + resultObj.deniedPresent[i]);
            allGranted = false;
          }
          for (var i = 0; i < resultObj.deniedAlways.length; i++) {
            console.log('永久拒绝权限：' + resultObj.deniedAlways[i]);
            allGranted = false;
          }
          
          if (!allGranted) {
            uni.showModal({
              title: '提示',
              content: '需要相机和存储权限才能正常使用拍照功能',
              confirmText: '去设置',
              success: (res) => {
                if (res.confirm) {
                  this.gotoAppPermissionSetting();
                }
              }
            });
          }
        },
        (error) => {
          console.error('权限请求失败', error);
        }
      );
    },

    // 跳转到应用权限设置页面
    gotoAppPermissionSetting() {
      const main = plus.android.runtimeMainActivity();
      const Intent = plus.android.importClass('android.content.Intent');
      const Settings = plus.android.importClass('android.provider.Settings');
      const Uri = plus.android.importClass('android.net.Uri');
      
      const intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
      const uri = Uri.fromParts('package', main.getPackageName(), null);
      intent.setData(uri);
      main.startActivity(intent);
    },
    
    // 处理拍照/选择图片
    handleUpload() {
      uni.showActionSheet({
        itemList: ['拍照', '从相册选择'],
        success: (res) => {
          const sourceType = res.tapIndex === 0 ? ['camera'] : ['album'];
          uni.chooseImage({
            count: 1,
            sourceType,
            success: (res) => {
              const tempFilePath = res.tempFilePaths[0];
              // 跳转到预览页面
              uni.navigateTo({
                url: `/pages/photo-preview/index?imagePath=${encodeURIComponent(tempFilePath)}`
              });
            },
            fail: (err) => {
              uni.showToast({
                title: sourceType[0] === 'camera' ? '拍照失败' : '选择图片失败',
                icon: 'none'
              });
            }
          });
        }
      });
    },
    
    // 查看详情
    viewDetail(record) {
      // 跳转到分析结果页面查看详情
      uni.navigateTo({
        url: `/pages/result/index?recordId=${record.id}`
      });
      
      // 旧方式：跳转到照片预览页面查看详情
      // uni.navigateTo({
      //   url: `/pages/photo-preview/index?imagePath=${encodeURIComponent(record.image)}&source=detail&recordId=${record.id}`
      // });
    },
    
    // 请求相机权限
    requestCameraAuth() {
      // #ifdef APP-PLUS || MP
      uni.authorize({
        scope: 'scope.camera',
        success: () => {
          this.openCamera();
        },
        fail: () => {
          uni.showModal({
            title: '提示',
            content: '需要相机权限才能进行拍照检测',
            confirmText: '去设置',
            success: (res) => {
              if (res.confirm) {
                uni.openSetting();
              }
            }
          });
        }
      });
      // #endif
      
      // #ifdef H5
      this.openCamera();
      // #endif
    },
    
    // 打开相机
    openCamera() {
      // 实现打开相机逻辑
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
