<template>
  <div class="share-card">
    <div class="card-pattern"></div>
    <div class="card-content">
      <div class="snake-badge">🐍</div>
      <h2 class="card-title">贪吃蛇大作战</h2>
      <div class="score-section">
        <span class="score-label">挑战分数</span>
        <span class="score-value">{{ score }}</span>
      </div>
      <p class="challenge-text">你能超越这个分数吗？</p>
      <div class="cta-section">
        <button class="play-btn" @click="emit('play')">
          <span class="btn-icon">🎮</span>
          <span>立即挑战</span>
        </button>
      </div>
    </div>
    <div class="card-footer">
      <span>长按保存 · 分享给好友</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  score: number
}>()

const emit = defineEmits<{
  play: []
}>()
</script>

<style scoped>
.share-card {
  position: relative;
  width: 100%;
  max-width: 360px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.card-pattern {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(78, 205, 196, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.card-content {
  position: relative;
  padding: 40px 32px;
  text-align: center;
}

.snake-badge {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  border: 2px solid rgba(0, 255, 136, 0.3);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.card-title {
  margin: 0 0 24px;
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #ccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.score-section {
  padding: 24px;
  margin-bottom: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.score-label {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
}

.score-value {
  display: block;
  font-size: 56px;
  font-weight: 800;
  background: linear-gradient(135deg, #00ff88, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5)); }
  50% { filter: drop-shadow(0 0 20px rgba(0, 255, 136, 0.8)); }
}

.challenge-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  margin: 0 0 24px;
}

.cta-section {
  margin-bottom: 8px;
}

.play-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  font-size: 18px;
  font-weight: 600;
  color: #0f0f23;
  background: linear-gradient(135deg, #00ff88, #00cc6a);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 8px 30px rgba(0, 255, 136, 0.4),
    0 0 0 0 rgba(0, 255, 136, 0.5);
  animation: pulse-btn 2s ease-in-out infinite;
}

@keyframes pulse-btn {
  0%, 100% { box-shadow: 0 8px 30px rgba(0, 255, 136, 0.4), 0 0 0 0 rgba(0, 255, 136, 0.5); }
  50% { box-shadow: 0 8px 30px rgba(0, 255, 136, 0.4), 0 0 0 10px rgba(0, 255, 136, 0); }
}

.play-btn:hover {
  transform: scale(1.05);
}

.play-btn:active {
  transform: scale(0.98);
}

.btn-icon {
  font-size: 22px;
}

.card-footer {
  padding: 16px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.card-footer span {
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
}
</style>
