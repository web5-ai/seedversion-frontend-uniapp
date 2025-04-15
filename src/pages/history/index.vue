<template>
  <view class="page-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="header-title">历史记录</text>
    </view>
    
    <!-- 主体内容区 -->
    <view class="content">
      <!-- 使用记录列表组件 -->
      <record-list 
        :records="historyRecords.data" 
        :show-time="true"
        @item-click="viewDetail"
        :empty-text="'暂无检测记录'"
      />
      <!-- 分页按钮 -->
      <view class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <button @click="nextPage" :disabled="!historyRecords.has_more">下一页</button>
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
      historyRecords: {
        data: [], // 当前页的数据
        has_more: false,
        total: 0
      },
      currentPage: 1,
      pageSize: 10, // 每页显示的记录数
      isLoading: false
    }
  },
  onLoad() {
    this.fetchHistoryRecords()
  },
  onShow() {
    this.currentPage = 1
    this.fetchHistoryRecords()
  },
  methods: {
    async fetchHistoryRecords() {
      if (this.isLoading) return
      
      this.isLoading = true
      uni.showLoading({
        title: '加载中...'
      })

      try {
        const res = await uni.request({
          url: 'http://youcaihua-api.harmony-dev.com/api/seed/index',
          method: 'POST',
          data: {
            page: this.currentPage,
            limit: this.pageSize,
          }, 
          header: {
            Authorization: uni.getStorageSync('token'),
            Server: true
          }
        })

        if (res.data && res.data.code === 1) {
          // 直接替换当前页的数据
          this.historyRecords = res.data.data
        } else {
          throw new Error(res.data?.msg || '加载失败')
        }
      } catch (error) {
        console.error('获取历史记录失败:', error)
        uni.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
        this.isLoading = false
      }
    },
    prevPage() {
      if (this.currentPage > 1 && !this.isLoading) {
        this.currentPage--
        this.fetchHistoryRecords()
      }
    },
    nextPage() {
      if (this.historyRecords.has_more && !this.isLoading) {
        this.currentPage++
        this.fetchHistoryRecords()
      }
    },
    viewDetail(record) {
      if (!record?.id) {
        uni.showToast({
          title: '记录信息不完整',
          icon: 'none'
        })
        return
      }

      uni.navigateTo({
        url: `/pages/result/index?recordId=${record.id}`
      })
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
}

/* 顶部标题栏 */
.header {
  background-color: #4CAF50;
  padding: 40px 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
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
}

/* 分页按钮样式 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
}
</style>
