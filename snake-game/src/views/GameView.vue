<template>
  <div class="game-view">
    <header class="game-header">
      <div class="score-board">
        <div class="score-item">
          <span class="label">得分</span>
          <span class="value current-score">{{ score }}</span>
        </div>
        <div class="score-item">
          <span class="label">最高</span>
          <span class="value high-score">{{ highScore }}</span>
        </div>
      </div>
      <button 
        v-if="isPlaying && !isGameOver" 
        class="pause-btn"
        @click="pauseGame"
      >
        ⏸️
      </button>
    </header>

    <main class="game-area">
      <div class="canvas-wrapper">
        <GameCanvas
          :snake="snake"
          :food="food"
          :grid-width="gridWidth"
          :grid-height="gridHeight"
          :is-game-over="isGameOver"
          @swipe="setDirection"
        />
        <GameOverlay
          :show="!isPlaying || isPaused || isGameOver"
          :type="overlayType"
          :score="score"
          :high-score="highScore"
          @start="startGame"
          @resume="resumeGame"
          @restart="startGame"
          @share="handleShare"
        />
      </div>
    </main>

    <GameControls @direction="setDirection" />

    <!-- Toast notification -->
    <Transition name="toast">
      <div v-if="showToast" class="toast">
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import GameCanvas from '../components/GameCanvas.vue'
import GameControls from '../components/GameControls.vue'
import GameOverlay from '../components/GameOverlay.vue'
import { useGame } from '../composables/useGame'
import { useShare } from '../composables/useShare'

const router = useRouter()
const {
  snake,
  food,
  score,
  highScore,
  isPlaying,
  isPaused,
  isGameOver,
  startGame,
  pauseGame,
  resumeGame,
  setDirection,
  gridWidth,
  gridHeight
} = useGame()

const { shareScore, copyShareLink } = useShare()

const showToast = ref(false)
const toastMessage = ref('')

const overlayType = computed(() => {
  if (isGameOver.value) return 'gameover'
  if (isPaused.value) return 'pause'
  return 'start'
})

const showToastMessage = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const handleShare = async () => {
  const shared = await shareScore(score.value)
  if (shared) {
    showToastMessage('分享链接已复制！')
  }
}
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.game-header {
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.score-board {
  display: flex;
  gap: 24px;
}

.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-item .label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.score-item .value {
  font-size: 28px;
  font-weight: 700;
}

.current-score {
  color: #00ff88;
}

.high-score {
  color: #ffdd44;
}

.pause-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pause-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.game-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas-wrapper {
  position: relative;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  background: rgba(0, 255, 136, 0.9);
  color: #0f0f23;
  font-weight: 500;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
  z-index: 100;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
