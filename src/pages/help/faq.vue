<template>
  <view class="page-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">&lt;</text>
      </view>
      <text class="header-title">常见问题</text>
    </view>
    
    <!-- 内容区域 -->
    <view class="content">
      <!-- 问题搜索框 -->
      <view class="search-box">
        <view class="search-input-wrap">
          <image src="/static/icons/search.svg" class="search-icon" mode="aspectFit" alt="搜索图标"></image>
          <input 
            type="text" 
            class="search-input" 
            placeholder="搜索问题" 
            v-model="searchKeyword"
            confirm-type="search"
            @confirm="handleSearch"
          />
          <text v-if="searchKeyword" class="clear-icon" @click="clearSearch">×</text>
        </view>
      </view>
      
      <!-- 问题分类 -->
      <view class="category-tabs">
        <view 
          v-for="(category, index) in categories" 
          :key="index"
          class="category-tab"
          :class="{ active: currentCategory === category.id }"
          @click="setCategory(category.id)"
        >
          <text class="category-text">{{ category.name }}</text>
        </view>
      </view>
      
      <!-- 问题列表 -->
      <view class="faq-list">
        <view 
          v-for="(faq, index) in filteredFAQs" 
          :key="index"
          class="faq-item"
          :class="{ expanded: expandedIndex === index }"
          @click="toggleExpand(index)"
        >
          <view class="faq-question">
            <text class="question-text">{{ faq.question }}</text>
            <text class="expand-icon">{{ expandedIndex === index ? '∨' : '>' }}</text>
          </view>
          <view class="faq-answer" v-if="expandedIndex === index">
            <text class="answer-text">{{ faq.answer }}</text>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="filteredFAQs.length === 0">
        <image src="/static/icons/help.svg" class="empty-icon" mode="aspectFit" alt="空状态图标"></image>
        <text class="empty-text">没有找到相关问题</text>
        <text class="empty-tip">请尝试其他关键词或者联系在线客服</text>
      </view>
      
      <!-- 联系客服 -->
      <view class="contact-section">
        <text class="contact-title">没有找到想要的答案？</text>
        <button class="contact-btn" @click="contactCustomerService">联系客服</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 搜索关键词
      searchKeyword: '',
      // 当前选中的分类
      currentCategory: 'all',
      // 展开的问题索引
      expandedIndex: -1,
      // 问题分类
      categories: [
        { id: 'all', name: '全部' },
        { id: 'account', name: '账户问题' },
        { id: 'detect', name: '检测相关' },
        { id: 'data', name: '数据解读' },
        { id: 'other', name: '其他' }
      ],
      // 问题列表
      faqs: [
        {
          question: '如何提高检测准确率？',
          answer: '要提高检测准确率，请注意以下几点：\n1. 确保拍摄环境光线充足均匀\n2. 保持相机镜头清洁\n3. 样品放置在纯色背景上\n4. 尽量使用垂直角度拍摄\n5. 确保样品在图片中占据中心位置\n6. 避免过度曝光或阴影',
          category: 'detect'
        },
        {
          question: '为什么检测结果与实验室检测有差异？',
          answer: '移动端检测基于图像识别和AI算法，与专业实验室使用物理化学方法相比可能存在一定误差。通常我们的检测结果与实验室检测的误差控制在±5%以内。影响准确性的因素包括光线条件、样品状态、拍摄角度等。如需高精度数据，建议仍送专业机构检测。',
          category: 'detect'
        },
        {
          question: '如何查看历史检测记录？',
          answer: '您可以通过以下两种方式查看历史检测记录：\n1. 在首页点击底部导航栏的"历史记录"选项卡\n2. 在"我的"页面中点击"历史记录"选项\n\n历史记录会按照检测时间从新到旧排序，您可以点击任意记录查看详细的检测报告。',
          category: 'detect'
        },
        {
          question: '如何修改个人资料？',
          answer: '修改个人资料的步骤如下：\n1. 进入"我的"页面\n2. 点击"账户信息"\n3. 在账户信息页面，您可以修改昵称、头像等个人资料\n4. 修改完成后点击保存即可',
          category: 'account'
        },
        {
          question: '忘记密码怎么办？',
          answer: '如果您忘记了登录密码，可以通过以下步骤重置：\n1. 在登录页面点击"忘记密码"\n2. 输入您注册时使用的手机号\n3. 获取并输入验证码\n4. 设置新密码\n5. 使用新密码登录',
          category: 'account'
        },
        {
          question: '油酸和亚油酸含量代表什么？',
          answer: '油酸(Oleic acid)和亚油酸(Linoleic acid)是油菜籽中重要的不饱和脂肪酸：\n\n油酸：单不饱和脂肪酸，含量高表示油品稳定性好，不易氧化\n亚油酸：多不饱和脂肪酸，是人体必需脂肪酸，营养价值高\n\n高品质油菜籽通常油酸含量在35-45%之间，亚油酸含量在15-30%之间。两者比例平衡的油品既有较好的稳定性，又有较高的营养价值。',
          category: 'data'
        },
        {
          question: '应用支持哪些样品的检测？',
          answer: '目前我们的应用主要支持油菜籽的成分检测，包括油酸含量、亚油酸含量等关键指标的分析。未来我们计划扩展支持更多农产品的检测，如大豆、花生、葵花籽等。如有特定检测需求，可通过反馈功能告诉我们。',
          category: 'other'
        },
        {
          question: '如何提交使用反馈？',
          answer: '提交使用反馈的步骤如下：\n1. 进入"我的"页面\n2. 点击"意见反馈"\n3. 选择反馈类型，填写具体内容\n4. 如有需要，可以附上截图\n5. 点击提交\n\n我们会在收到反馈后尽快处理并回复。',
          category: 'other'
        }
      ]
    }
  },
  computed: {
    // 过滤后的FAQ列表
    filteredFAQs() {
      let results = this.faqs;
      
      // 按分类筛选
      if (this.currentCategory !== 'all') {
        results = results.filter(faq => faq.category === this.currentCategory);
      }
      
      // 按关键词搜索
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.toLowerCase().trim();
        results = results.filter(faq => 
          faq.question.toLowerCase().includes(keyword) || 
          faq.answer.toLowerCase().includes(keyword)
        );
      }
      
      return results;
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    
    // 处理搜索
    handleSearch() {
      console.log('搜索关键词:', this.searchKeyword);
      // 关闭键盘
      uni.hideKeyboard();
    },
    
    // 清除搜索
    clearSearch() {
      this.searchKeyword = '';
    },
    
    // 设置分类
    setCategory(categoryId) {
      this.currentCategory = categoryId;
      this.expandedIndex = -1; // 切换分类时收起所有问题
    },
    
    // 切换问题展开状态
    toggleExpand(index) {
      if (this.expandedIndex === index) {
        this.expandedIndex = -1; // 再次点击收起
      } else {
        this.expandedIndex = index; // 展开点击的问题
      }
    },
    
    // 联系客服
    contactCustomerService() {
      // 实际项目中这里应该实现联系客服的逻辑
      uni.showToast({
        title: '客服功能开发中，敬请期待',
        icon: 'none',
        duration: 2000
      });
    }
  }
}
</script>

<style>
.page-container {
  min-height: 100vh;
  background-color: var(--bg-page, #f5f5f5);
  display: flex;
  flex-direction: column;
}

/* 顶部标题栏 */
.header {
  background-color: var(--primary-color, #4CAF50);
  padding: 40px 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.header-title {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.back-btn {
  position: absolute;
  left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}

.back-icon {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 15px;
}

/* 搜索框 */
.search-box {
  margin-bottom: 15px;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 8px 12px;
  position: relative;
}

.search-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  height: 24px;
  font-size: 14px;
}

.clear-icon {
  font-size: 18px;
  color: #999;
  padding: 0 5px;
}

/* 分类标签 */
.category-tabs {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.category-tab {
  padding: 8px 15px;
  margin-right: 10px;
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #eee;
}

.category-tab.active {
  background-color: var(--primary-color, #4CAF50);
  border-color: var(--primary-color, #4CAF50);
}

.category-text {
  font-size: 14px;
  color: #666;
}

.category-tab.active .category-text {
  color: #fff;
}

/* FAQ列表 */
.faq-list {
  margin-bottom: 20px;
}

.faq-item {
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.question-text {
  font-size: 15px;
  color: #333;
  flex: 1;
}

.expand-icon {
  font-size: 16px;
  color: #999;
  transition: transform 0.3s ease;
}

.faq-item.expanded .expand-icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 15px 15px;
  border-top: 1px solid #f0f0f0;
}

.answer-text {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.empty-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
  opacity: 0.5;
}

.empty-text {
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
}

.empty-tip {
  font-size: 14px;
  color: #999;
}

/* 联系客服区域 */
.contact-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.contact-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.contact-btn {
  background-color: var(--primary-color, #4CAF50);
  color: #fff;
  font-size: 14px;
  padding: 8px 30px;
  border-radius: 20px;
  border: none;
}
</style> 