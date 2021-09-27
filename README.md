# 前言

基于 vue3 + typescript 的简单交互视频项目

## 技术栈

vue3 + vite + typescript


## 项目运行

```
npm install

npm run dev
```

# 目标功能
- [x] 简单的视频交互功能（跳过、跳转指定章节、从头播放）
- [ ] 多种视频格式


# 项目布局

```
interactive-video
├─ .gitignore
├─ index.html                                         // 入口html文件
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ App.vue                                         // 页面入口文件
│  ├─ components                                      // 组件
│  │  ├─ controller                                   // 控制层组件
│  │  │  └─ index.vue
│  │  └─ video-player                                 // 视频播放器组件
│  │     └─ index.vue
│  ├─ index.css                                       // 项目主要样式文件
│  ├─ main.ts                                         // 程序入口文件，加载各种公共组件
│  ├─ shims-vue.d.ts
│  ├─ steps.json                                      // 交互脚本文件
│  └─ types                                           // 定义TS类型文件
│     └─ steps.ts                                     // 脚本类型定义文件
└─ tsconfig.json                                      // TS配置文件
```