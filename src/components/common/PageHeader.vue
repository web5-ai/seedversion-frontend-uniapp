<template>
  <view class="page-header">
    <view v-if="showBack" class="back-btn" @click="handleBack">
      <image src="/static/icons/back.svg" class="back-icon" mode="aspectFit"></image>
    </view>
    <view class="header-title">{{ title }}</view>
    <slot name="right"></slot>
  </view>
</template>

<script>
/**
 * 页面头部组件
 * 使用方法: <page-header title="页面标题" :show-back="true" @back="onBack" />
 */
export default {
  name: 'PageHeader',
  props: {
    /**
     * 页面标题
     */
    title: {
      type: String,
      required: true
    },
    /**
     * 是否显示返回按钮
     */
    showBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * 处理返回按钮点击
     */
    handleBack() {
      this.$emit('back');
      // 默认行为是返回上一页
      uni.navigateBack({
        fail: () => {
          // 如果返回失败（没有上一页），则跳转到首页
          uni.switchTab({
            url: '/pages/index/index'
          });
        }
      });
    }
  }
}
</script>

<style>
/* 使用Tailwind类 */
</style> 