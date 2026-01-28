# 🚀 部署指南

这个文档会指导你如何将 gg-ant 项目部署到 Vercel。

## 📋 前置准备

- [x] Git 仓库已初始化
- [x] 代码已提交
- [ ] GitHub 账号（如果没有，请访问 [github.com](https://github.com) 注册）
- [ ] Vercel 账号（可以用 GitHub 账号登录）

---

## 第一步：上传到 GitHub

### 1. 创建 GitHub 仓库

1. 访问 [https://github.com](https://github.com) 并登录
2. 点击右上角的 `+` 号 → `New repository`
3. 填写信息：
   - **Repository name**: `gg-ant`
   - **Visibility**: 选择 `Public`（公开）
   - ⚠️ **不要**勾选 "Add a README file"
4. 点击 `Create repository`

### 2. 推送代码到 GitHub

在 GitHub 创建仓库后，你会看到一个页面显示仓库地址。

**方法一：使用提供的脚本（推荐）**

```bash
# 1. 编辑 push-to-github.sh 文件
# 2. 将 YOUR_GITHUB_USERNAME 替换为你的 GitHub 用户名
# 3. 保存后运行：
./push-to-github.sh
```

**方法二：手动执行命令**

```bash
# 替换 YOUR_GITHUB_USERNAME 为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/gg-ant.git
git branch -M main
git push -u origin main
```

推送成功后，刷新 GitHub 页面，你应该能看到所有文件了！

---

## 第二步：在 Vercel 上部署

### 1. 登录 Vercel

1. 访问 [https://vercel.com](https://vercel.com)
2. 点击 `Sign Up` 或 `Log In`
3. 选择 **Continue with GitHub**（用 GitHub 账号登录）
4. 授权 Vercel 访问你的 GitHub 仓库

### 2. 导入项目

1. 在 Vercel 仪表板，点击 `Add New...` → `Project`
2. 找到 `gg-ant` 仓库，点击 `Import`
3. 配置项目：
   - **Project Name**: `gg-ant-calendar`（或其他你喜欢的名字）
   - **Framework Preset**: Vite
   - **Root Directory**: 保持默认 `./`（Vercel 会自动检测 vercel.json）
   - **Build and Output Settings**: 保持默认（vercel.json 已配置）

### 3. 部署

1. 点击 `Deploy` 按钮
2. 等待 2-3 分钟，Vercel 会自动：
   - 安装依赖
   - 构建项目
   - 部署到全球 CDN

### 4. 访问你的网站

部署成功后，你会看到：
- 🎉 恭喜页面
- 🔗 你的网站地址，类似：`https://gg-ant-calendar.vercel.app`

点击地址即可在浏览器中访问你的日历应用！

---

## 第三步：部署 Snake Game（可选）

如果你也想部署贪吃蛇游戏：

1. 在 Vercel 仪表板，再次点击 `Add New...` → `Project`
2. 选择同一个 `gg-ant` 仓库，点击 `Import`
3. 这次配置：
   - **Root Directory**: 点击 `Edit`，选择 `snake-game`
   - 其他保持默认
4. 点击 `Deploy`

---

## 📝 后续更新

每次你修改代码后，只需要：

```bash
# 提交更改
git add .
git commit -m "你的更新说明"

# 推送到 GitHub
git push
```

Vercel 会自动检测到更新并重新部署！✨

---

## 🔧 故障排除

### 问题：构建失败

**解决方案**：
1. 检查 Vercel 的构建日志
2. 确保本地能成功运行 `npm run build`
3. 查看是否有依赖缺失

### 问题：页面打开是空白

**解决方案**：
1. 检查浏览器控制台是否有错误
2. 确保 base path 配置正确
3. 检查路由配置

### 问题：推送到 GitHub 失败

**解决方案**：
```bash
# 如果已经添加过 origin，先删除
git remote remove origin

# 重新添加正确的地址
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/gg-ant.git
git push -u origin main
```

---

## 📞 需要帮助？

如果遇到任何问题，随时告诉我！

---

## 🎯 快速检查清单

- [ ] 在 GitHub 上创建了 `gg-ant` 仓库
- [ ] 运行 `./push-to-github.sh` 或手动推送代码
- [ ] 在 GitHub 上能看到所有文件
- [ ] 登录 Vercel（使用 GitHub 账号）
- [ ] 从 Vercel 导入 `gg-ant` 项目
- [ ] 等待部署完成
- [ ] 访问 Vercel 提供的地址
- [ ] 🎉 看到你的应用运行！

Good luck! 🚀
