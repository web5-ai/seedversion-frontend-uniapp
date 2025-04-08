# 油菜籽成分检测系统

## 简介

这是一个基于uni-app框架开发的油菜籽成分检测系统，使用Vue3和TypeScript。

## 技术栈

- uni-app
- Vue 3
- TypeScript
- TailwindCSS

## 项目结构

```
├── src                     # 源代码
│   ├── components          # 组件目录
│   │   ├── common          # 通用组件
│   │   ├── form            # 表单组件
│   │   └── layout          # 布局组件
│   ├── pages               # 页面目录
│   │   └── hello           # Hello World示例页面
│   ├── static              # 静态资源
│   ├── store               # Vuex存储
│   ├── styles              # 样式文件
│   ├── App.vue             # 主应用组件
│   ├── main.js             # 入口文件
│   ├── manifest.json       # 应用配置
│   └── pages.json          # 页面配置
└── static                  # 全局静态资源
```

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
- 使用Node.js v16.20.2版本进行开发 