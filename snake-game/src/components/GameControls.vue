<template>
  <div class="controls" v-if="isMobile">
    <div class="control-row">
      <button class="control-btn" @touchstart.prevent="emit('direction', 'up')" @click="emit('direction', 'up')">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
      </button>
    </div>
    <div class="control-row middle">
      <button class="control-btn" @touchstart.prevent="emit('direction', 'left')" @click="emit('direction', 'left')">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <div class="control-center">
        <span class="snake-icon">🐍</span>
      </div>
      <button class="control-btn" @touchstart.prevent="emit('direction', 'right')" @click="emit('direction', 'right')">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>
    </div>
    <div class="control-row">
      <button class="control-btn" @touchstart.prevent="emit('direction', 'down')" @click="emit('direction', 'down')">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
  direction: [dir: 'up' | 'down' | 'left' | 'right']
}>()

const isMobile = ref(false)

onMounted(() => {
  // Detect mobile device
  isMobile.value = 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 ||
    window.innerWidth < 768
})
</script>

<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  user-select: none;
  -webkit-user-select: none;
}

.control-row {
  display: flex;
  justify-content: center;
}

.control-row.middle {
  gap: 8px;
}

.control-btn {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  border: 2px solid rgba(0, 255, 136, 0.3);
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 136, 0.05));
  color: #00ff88;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.control-btn:active {
  transform: scale(0.92);
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.25), rgba(0, 255, 136, 0.15));
  border-color: rgba(0, 255, 136, 0.6);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.control-btn svg {
  width: 32px;
  height: 32px;
}

.control-center {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(15, 15, 35, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.snake-icon {
  font-size: 28px;
}
</style>
