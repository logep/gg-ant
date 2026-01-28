<template>
  <Transition name="fade">
    <div v-if="show" class="overlay">
      <div class="overlay-content">
        <!-- Start Screen -->
        <template v-if="type === 'start'">
          <div class="logo">
            <span class="snake-emoji">🐍</span>
            <h1 class="title">贪吃蛇大作战</h1>
          </div>
          <p class="subtitle">经典游戏，全新体验</p>
          <div class="high-score" v-if="highScore > 0">
            <span class="label">最高分</span>
            <span class="value">{{ highScore }}</span>
          </div>
          <button class="primary-btn" @click="emit('start')">
            <span>开始游戏</span>
            <span class="hint">按空格键或点击开始</span>
          </button>
          <p class="controls-hint">
            <span class="desktop">方向键 / WASD 控制移动</span>
            <span class="mobile">滑动屏幕或使用虚拟按键</span>
          </p>
        </template>

        <!-- Pause Screen -->
        <template v-else-if="type === 'pause'">
          <div class="pause-icon">⏸️</div>
          <h2 class="pause-title">游戏暂停</h2>
          <p class="current-score">当前分数: <strong>{{ score }}</strong></p>
          <div class="pause-actions">
            <button class="primary-btn" @click="emit('resume')">继续游戏</button>
            <button class="secondary-btn" @click="emit('restart')">重新开始</button>
          </div>
        </template>

        <!-- Game Over Screen -->
        <template v-else-if="type === 'gameover'">
          <div class="gameover-header">
            <span class="gameover-icon">💀</span>
            <h2 class="gameover-title">游戏结束</h2>
          </div>
          <div class="score-display">
            <div class="final-score">
              <span class="label">最终得分</span>
              <span class="value animate-score">{{ score }}</span>
            </div>
            <div class="best-score" v-if="isNewRecord">
              <span class="new-record">🎉 新纪录！</span>
            </div>
            <div class="high-score-info" v-else>
              <span class="label">最高分</span>
              <span class="value">{{ highScore }}</span>
            </div>
          </div>
          <div class="gameover-actions">
            <button class="primary-btn" @click="emit('restart')">
              <span>再来一局</span>
            </button>
            <button class="share-btn" @click="emit('share')">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
              </svg>
              <span>分享成绩</span>
            </button>
          </div>
        </template>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
  type: 'start' | 'pause' | 'gameover'
  score: number
  highScore: number
}>()

const emit = defineEmits<{
  start: []
  resume: []
  restart: []
  share: []
}>()

const isNewRecord = computed(() => props.score > 0 && props.score >= props.highScore)
</script>

<style scoped>
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 15, 35, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 10;
  border-radius: 12px;
}

.overlay-content {
  text-align: center;
  padding: 24px;
  max-width: 320px;
}

.logo {
  margin-bottom: 16px;
}

.snake-emoji {
  font-size: 64px;
  display: block;
  margin-bottom: 8px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.title {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #00ff88, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.subtitle {
  color: rgba(255, 255, 255, 0.6);
  margin: 8px 0 24px;
  font-size: 14px;
}

.high-score {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.high-score .label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.high-score .value {
  color: #ffdd44;
  font-weight: 700;
  font-size: 20px;
}

.primary-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  color: #0f0f23;
  background: linear-gradient(135deg, #00ff88, #00cc6a);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(0, 255, 136, 0.4);
}

.primary-btn:active {
  transform: translateY(0);
}

.primary-btn .hint {
  font-size: 12px;
  opacity: 0.7;
  font-weight: 400;
  margin-top: 4px;
}

.controls-hint {
  margin-top: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}

.controls-hint .mobile {
  display: none;
}

@media (max-width: 768px), (hover: none) {
  .controls-hint .desktop { display: none; }
  .controls-hint .mobile { display: inline; }
}

/* Pause Screen */
.pause-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.pause-title {
  font-size: 24px;
  margin: 0 0 8px;
  color: #fff;
}

.current-score {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
}

.current-score strong {
  color: #00ff88;
  font-size: 20px;
}

.pause-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.secondary-btn {
  width: 100%;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* Game Over Screen */
.gameover-header {
  margin-bottom: 24px;
}

.gameover-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 8px;
}

.gameover-title {
  font-size: 24px;
  margin: 0;
  color: #ff6b6b;
}

.score-display {
  margin-bottom: 24px;
}

.final-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(0, 255, 136, 0.1);
  border-radius: 16px;
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.final-score .label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.final-score .value {
  font-size: 48px;
  font-weight: 800;
  color: #00ff88;
}

.animate-score {
  animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.new-record {
  display: inline-block;
  margin-top: 12px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #ffdd44, #ff8800);
  color: #0f0f23;
  font-weight: 600;
  border-radius: 20px;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.high-score-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.high-score-info .value {
  color: #ffdd44;
  font-weight: 600;
}

.gameover-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(135deg, #4ecdc4, #44a8ff);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.share-btn svg {
  width: 20px;
  height: 20px;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(78, 205, 196, 0.3);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
