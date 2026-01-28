#!/bin/bash

# 为 gg-ant 仓库单独配置 Git 用户信息
# 这个配置只会影响当前仓库，不会影响其他地方

echo "🔧 为 gg-ant 仓库配置独立的 Git 用户信息..."
echo ""
echo "请输入你的个人 GitHub 用户名（不是公司的）："
read github_username

echo "请输入你的个人 GitHub 邮箱（不是公司的）："
read github_email

# 设置本地配置
git config --local user.name "$github_username"
git config --local user.email "$github_email"

echo ""
echo "✅ 配置完成！"
echo ""
echo "📋 当前 gg-ant 仓库的 Git 配置："
git config --local user.name
git config --local user.email
echo ""
echo "💡 这个配置只对 gg-ant 仓库有效，不会影响其他仓库"
echo ""
echo "🔍 验证全局配置（公司信息）："
echo "全局用户名: $(git config --global user.name)"
echo "全局邮箱: $(git config --global user.email)"
