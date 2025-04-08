<template>
  <view 
    class="btn"
    :class="[
      `btn-${type}`,
      { 'btn-disabled': disabled || loading, 'btn-block': block, 'btn-round': round }
    ]"
    @click="handleClick"
    :aria-disabled="disabled || loading"
  >
    <view class="loading-spinner" v-if="loading"></view>
    <text v-else class="btn-text">
      <slot></slot>
    </text>
  </view>
</template>

<script>
/**
 * 按钮组件
 * 使用方法: <common-button type="primary" :loading="false" :disabled="false" :block="true" :round="false" @click="handleClick">按钮文本</common-button>
 */
export default {
  name: 'CommonButton',
  props: {
    /**
     * 按钮类型：primary(主要按钮), secondary(次要按钮), 
     * success(成功), warning(警告), danger(危险)
     */
    type: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示加载中状态
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 是否占满整行宽度
     */
    block: {
      type: Boolean,
      default: true
    },
    /**
     * 是否为圆角按钮
     */
    round: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(event) {
      // 如果按钮禁用或正在加载中，不触发点击事件
      if (this.disabled || this.loading) return;
      
      this.$emit('click', event);
    }
  }
}
</script>

<style>
/* 使用Tailwind类，无需单独CSS */
</style> 