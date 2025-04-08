<template>
  <view class="info-card">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'InfoCard'
}
</script>

<style>
.info-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.1);
  overflow: hidden;
  margin-bottom: 15px;
}
</style> 