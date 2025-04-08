<template>
  <view class="icon-wrapper" :style="computedStyle">
    <image 
      :src="iconPath" 
      :style="computedImageStyle" 
      mode="aspectFit"
      :alt="alt || name + '图标'"
      class="icon-image"
    ></image>
  </view>
</template>

<script>
/**
 * SVG图标组件
 * 使用方法: <icon-svg name="user" size="24" color="#4CAF50" />
 */
export default {
  name: 'IconSvg',
  props: {
    /**
     * 图标名称，对应static/icons/下的文件名
     */
    name: {
      type: String,
      required: true
    },
    /**
     * 图标尺寸
     */
    size: {
      type: [Number, String],
      default: 24
    },
    /**
     * 图标颜色
     */
    color: {
      type: String,
      default: ''
    },
    /**
     * 是否处于激活状态
     */
    active: {
      type: Boolean,
      default: false
    },
    /**
     * 图标辅助说明
     */
    alt: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 计算图标路径
    iconPath() {
      if (this.active) {
        return `/static/icons/${this.name}-active.svg`;
      }
      return `/static/icons/${this.name}.svg`;
    },
    
    // 计算容器样式
    computedStyle() {
      return {
        width: typeof this.size === 'number' ? `${this.size}px` : this.size,
        height: typeof this.size === 'number' ? `${this.size}px` : this.size
      };
    },
    
    // 计算图像样式
    computedImageStyle() {
      const baseStyle = {
        width: '100%',
        height: '100%'
      };
      
      return baseStyle;
    }
  }
};
</script>

<style>
.icon-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.icon-image {
  width: 100%;
  height: 100%;
}
</style> 