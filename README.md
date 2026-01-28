# GG-ANT Projects

这是一个 monorepo（单仓库多项目），包含多个独立的 Web 应用。

> 💡 **提示**: 每个项目都可以独立开发和部署到 Vercel。

## 📂 项目列表

### 📅 Calendar App
一个功能强大的中国万年历应用，支持 PWA、日历导出等功能。

- 技术栈：Vue 3 + TypeScript + Vite
- 在线预览：[链接将在部署后更新]
- [查看详情](./calendar-app/README.md)

### 🐍 Snake Game
经典的贪吃蛇游戏。

- 技术栈：Vue 3 + TypeScript + Vite
- 在线预览：[链接将在部署后更新]
- [查看详情](./snake-game/README.md)

## 本地开发

每个项目都可以独立运行：

```bash
# 进入项目目录
cd calendar-app  # 或 cd snake-game

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署

本项目使用 Vercel 进行部署。每个子项目都会独立部署为单独的应用。

### 🚀 快速部署

详细的部署指南请查看：**[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)**

**简要步骤**：
1. 在 Vercel 导入 `gg-ant` 仓库
2. 为每个子项目创建独立的部署
3. 设置对应的 **Root Directory**（`calendar-app` 或 `snake-game`）
4. 点击部署

### 🌐 在线预览

- Calendar App: [部署后更新]
- Snake Game: [部署后更新]

## 许可证

MIT
