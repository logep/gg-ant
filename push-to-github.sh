#!/bin/bash

# 这个脚本会帮你把代码推送到 GitHub
# 使用方法：
# 1. 先在 GitHub 上创建一个名为 gg-ant 的仓库
# 2. 将下面的 YOUR_GITHUB_USERNAME 替换为你的 GitHub 用户名
# 3. 运行: bash push-to-github.sh

# ⚠️ 请替换成你的 GitHub 用户名
GITHUB_USERNAME="YOUR_GITHUB_USERNAME"
REPO_NAME="gg-ant"

echo "📤 正在推送代码到 GitHub..."

# 添加远程仓库
git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# 推送代码
git branch -M main
git push -u origin main

echo "✅ 代码已成功推送到 GitHub!"
echo "🔗 仓库地址: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
