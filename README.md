# 油菜籽成分检测系统

## 简介

这是一个基于uni-app框架开发的油菜籽成分检测系统，使用Vue3和JavaScript，界面使用Tailwind CSS构建。

## 技术栈

- uni-app
- Vue 3
- JavaScript
- TailwindCSS

## 项目结构

```
├── src                     # 源代码
│   ├── components          # 组件目录
│   │   ├── common          # 通用组件
│   │   │   └── Button.vue  # 按钮组件
│   │   ├── form            # 表单组件
│   │   │   └── Input.vue   # 输入框组件 
│   │   └── layout          # 布局组件
│   ├── pages               # 页面目录
│   │   ├── login           # 登录页面
│   │   └── hello           # Hello World示例页面
│   ├── static              # 静态资源
│   │   ├── images          # 图片资源
│   │   │   └── logo-placeholder.svg # 应用logo占位图
│   ├── store               # Vuex存储
│   ├── styles              # 样式文件
│   │   └── tailwind.css    # Tailwind CSS文件
│   ├── App.vue             # 主应用组件
│   ├── main.js             # 入口文件
│   ├── manifest.json       # 应用配置
│   └── pages.json          # 页面配置
└── static                  # 全局静态资源
```

## 已实现的功能

1. **登录/注册页面**
   - 手机号验证码登录
   - 验证码获取倒计时
   - 表单验证
   - 用户协议与隐私政策链接

## 待实现功能

1. 首页
2. 检测记录列表
3. 扫描上传功能
4. 个人中心

## 运行项目

```bash
# 安装依赖
yarn

# 开发模式运行 H5
yarn dev:h5

# 发布
yarn build
```

## 注意事项

- 本项目使用TailwindCSS进行样式管理
- 所有图片资源统一放在 `/static/images/` 目录下
- 使用Node.js v16.20.2版本进行开发 