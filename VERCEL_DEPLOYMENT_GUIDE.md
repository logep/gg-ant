# 📦 Vercel 多项目部署指南

本仓库是一个 monorepo，包含多个独立的应用。每个应用都需要单独部署到 Vercel。

## 📋 当前项目列表

- **calendar-app** - 中国万年历应用
- **snake-game** - 贪吃蛇游戏

## 🚀 部署步骤

### 部署 Calendar App

1. 登录 [Vercel](https://vercel.com)
2. 点击 `Add New...` → `Project`
3. 选择 `gg-ant` 仓库，点击 `Import`
4. **配置项目**：
   - **Project Name**: `gg-ant-calendar`
   - **Framework Preset**: `Vite`
   - **Root Directory**: 点击 `Edit`，选择 `calendar-app` ⭐️
   - **Build Command**: `npm run build`（自动检测）
   - **Output Directory**: `dist`（自动检测）
5. 点击 `Deploy`
6. 等待部署完成

### 部署 Snake Game

1. 再次点击 `Add New...` → `Project`
2. 选择**同一个** `gg-ant` 仓库，点击 `Import`
3. **配置项目**：
   - **Project Name**: `gg-ant-snake-game`
   - **Framework Preset**: `Vite`
   - **Root Directory**: 点击 `Edit`，选择 `snake-game` ⭐️
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. 点击 `Deploy`
6. 等待部署完成

## 🔄 添加新项目

将来如果你在 gg-ant 下添加新的项目，只需要：

1. 在本地创建新项目文件夹，例如 `my-new-app`
2. 提交并推送到 GitHub
3. 在 Vercel 上重复上述步骤，设置 **Root Directory** 为 `my-new-app`

## 📊 管理多个部署

所有部署都会显示在你的 Vercel 仪表板：

```
gg-ant-calendar       → https://gg-ant-calendar.vercel.app
gg-ant-snake-game     → https://gg-ant-snake-game.vercel.app
gg-ant-my-new-app     → https://gg-ant-my-new-app.vercel.app
```

## ⚙️ 自动部署

每次你推送代码到 GitHub 的 `main` 分支时：
- Vercel 会检测哪些项目有变更
- 只重新部署有变更的项目
- 未变更的项目保持不变

## 💡 提示

- ✅ 每个项目都是独立部署，互不影响
- ✅ 每个项目都有独立的 URL
- ✅ 可以为每个项目设置独立的自定义域名
- ✅ 支持无限扩展新项目

## 🔧 环境变量

如果某个项目需要环境变量：
1. 进入该项目的 Vercel 设置
2. Settings → Environment Variables
3. 添加变量（只影响该项目）

## 🌐 自定义域名（可选）

为每个项目设置独立域名：
1. 购买域名（如 `example.com`）
2. 在 Vercel 项目设置中添加域名：
   - Calendar: `calendar.example.com`
   - Snake: `snake.example.com`
3. 配置 DNS 记录
