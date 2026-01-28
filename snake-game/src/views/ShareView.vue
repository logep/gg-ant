<template>
  <div class="share-view">
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>
    
    <div class="share-content">
      <ShareCard :score="sharedScore" @play="goToGame" />
      
      <div class="share-actions">
        <button class="action-btn primary" @click="goToGame">
          <span>🎮</span> 开始游戏
        </button>
        <button v-if="canInstall" class="action-btn secondary" @click="installApp">
          <span>📲</span> 安装应用
        </button>
      </div>

      <div class="features">
        <div class="feature">
          <span class="icon">📱</span>
          <span>支持离线游玩</span>
        </div>
        <div class="feature">
          <span class="icon">🏆</span>
          <span>本地最高分记录</span>
        </div>
        <div class="feature">
          <span class="icon">🎯</span>
          <span>简单易上手</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ShareCard from '../components/ShareCard.vue'
import { useShare } from '../composables/useShare'

const router = useRouter()
const { getScoreFromUrl } = useShare()

const sharedScore = ref(0)
const canInstall = ref(false)
let deferredPrompt: any = null

onMounted(() => {
  const score = getScoreFromUrl()
  sharedScore.value = score || 0

  // Listen for PWA install prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    canInstall.value = true
  })
})

const goToGame = () => {
  router.push('/')
}

const installApp = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      canInstall.value = false
    }
    deferredPrompt = null
  }
}

const getParticleStyle = (i: number) => {
  const size = Math.random() * 4 + 2
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 10}s`
  }
}
</script>

<style scoped>
.share-view {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

/* Floating particles background */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: rgba(0, 255, 136, 0.5);
  border-radius: 50%;
  animation: float-particle linear infinite;
}

@keyframes float-particle {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(720deg);
    opacity: 0;
  }
}

.share-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 400px;
  width: 100%;
}

.share-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.primary {
  color: #0f0f23;
  background: linear-gradient(135deg, #00ff88, #00cc6a);
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(0, 255, 136, 0.4);
}

.action-btn.secondary {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.feature .icon {
  font-size: 16px;
}
</style>
