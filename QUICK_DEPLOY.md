# 🚀 Vercel 多项目快速部署操作指南

## 📦 当前项目
- `calendar-app` - 中国万年历
- `snake-game` - 贪吃蛇游戏

## ⚡️ 快速操作步骤

### 1️⃣ 部署第一个项目 (Calendar App)

**Vercel 配置**：
```
Project Name:     gg-ant-calendar
Framework:        Vite
Root Directory:   calendar-app  ⭐️ 关键设置
Build Command:    npm run build
Output Directory: dist
Install Command:  npm install
```

### 2️⃣ 部署第二个项目 (Snake Game)

**重要**：从同一个仓库再次导入

**Vercel 配置**：
```
Project Name:     gg-ant-snake
Framework:        Vite  
Root Directory:   snake-game  ⭐️ 关键设置
Build Command:    npm run build
Output Directory: dist
Install Command:  npm install
```

## 🎯 关键点

1. **同一个 GitHub 仓库可以创建多个 Vercel 项目**
2. **每个项目通过不同的 Root Directory 区分**
3. **每个项目有独立的 URL**

## 📸 操作截图参考

### 设置 Root Directory
在 Vercel 项目配置页面：
1. 找到 "Root Directory" 选项
2. 点击 "Edit" 按钮
3. 选择对应的文件夹（calendar-app 或 snake-game）
4. 点击 "Continue"

## ✅ 验证清单

- [ ] Calendar App 部署成功
  - [ ] 可以访问 Vercel 提供的 URL
  - [ ] 应用正常运行
  - [ ] 记录 URL
  
- [ ] Snake Game 部署成功
  - [ ] 可以访问 Vercel 提供的 URL
  - [ ] 应用正常运行
  - [ ] 记录 URL

## 🔮 将来添加新项目

1. 在 `gg-ant` 下创建新文件夹，如 `my-app`
2. 开发你的应用
3. Push 到 GitHub
4. 在 Vercel 导入同一个仓库
5. 设置 Root Directory 为 `my-app`
6. 部署！

就是这么简单！🎉
