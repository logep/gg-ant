<template>
  <canvas
    ref="canvasRef"
    :width="canvasSize"
    :height="canvasSize"
    class="game-canvas"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import type { Point } from '../composables/useGame'

const props = defineProps<{
  snake: Point[]
  food: Point
  gridWidth: number
  gridHeight: number
  isGameOver: boolean
}>()

const emit = defineEmits<{
  swipe: [direction: 'up' | 'down' | 'left' | 'right']
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

// Responsive canvas size
const canvasSize = computed(() => {
  if (typeof window === 'undefined') return 400
  const maxSize = Math.min(window.innerWidth - 40, window.innerHeight - 250, 500)
  return Math.floor(maxSize / props.gridWidth) * props.gridWidth
})

const cellSize = computed(() => canvasSize.value / props.gridWidth)

// Touch handling for swipe gestures
let touchStartX = 0
let touchStartY = 0

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

const handleTouchMove = (e: TouchEvent) => {
  e.preventDefault()
}

const handleTouchEnd = (e: TouchEvent) => {
  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY
  
  const deltaX = touchEndX - touchStartX
  const deltaY = touchEndY - touchStartY
  
  const minSwipeDistance = 30
  
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (Math.abs(deltaX) > minSwipeDistance) {
      emit('swipe', deltaX > 0 ? 'right' : 'left')
    }
  } else {
    if (Math.abs(deltaY) > minSwipeDistance) {
      emit('swipe', deltaY > 0 ? 'down' : 'up')
    }
  }
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const size = cellSize.value

  // Clear canvas with dark background
  ctx.fillStyle = '#0f0f23'
  ctx.fillRect(0, 0, canvasSize.value, canvasSize.value)

  // Draw grid (subtle)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
  ctx.lineWidth = 1
  for (let i = 0; i <= props.gridWidth; i++) {
    ctx.beginPath()
    ctx.moveTo(i * size, 0)
    ctx.lineTo(i * size, canvasSize.value)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i * size)
    ctx.lineTo(canvasSize.value, i * size)
    ctx.stroke()
  }

  // Draw food with glow effect
  const foodX = props.food.x * size + size / 2
  const foodY = props.food.y * size + size / 2
  
  // Outer glow
  const gradient = ctx.createRadialGradient(foodX, foodY, 0, foodX, foodY, size)
  gradient.addColorStop(0, 'rgba(255, 107, 107, 0.8)')
  gradient.addColorStop(0.5, 'rgba(255, 107, 107, 0.3)')
  gradient.addColorStop(1, 'rgba(255, 107, 107, 0)')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(foodX, foodY, size, 0, Math.PI * 2)
  ctx.fill()
  
  // Food core
  ctx.fillStyle = '#ff6b6b'
  ctx.shadowColor = '#ff6b6b'
  ctx.shadowBlur = 15
  ctx.beginPath()
  ctx.arc(foodX, foodY, size * 0.35, 0, Math.PI * 2)
  ctx.fill()
  ctx.shadowBlur = 0

  // Draw snake
  props.snake.forEach((segment, index) => {
    const x = segment.x * size
    const y = segment.y * size
    const isHead = index === 0
    
    // Calculate color gradient from head to tail
    const hue = 140 + (index * 2) % 40 // Green variations
    const saturation = 100 - (index / props.snake.length) * 30
    const lightness = 60 - (index / props.snake.length) * 20
    
    ctx.fillStyle = isHead ? '#00ff88' : `hsl(${hue}, ${saturation}%, ${lightness}%)`
    
    if (isHead) {
      ctx.shadowColor = '#00ff88'
      ctx.shadowBlur = 20
    }
    
    // Rounded rectangle for segments
    const padding = 1
    const radius = size * 0.2
    ctx.beginPath()
    ctx.roundRect(x + padding, y + padding, size - padding * 2, size - padding * 2, radius)
    ctx.fill()
    
    ctx.shadowBlur = 0
    
    // Draw eyes on head
    if (isHead) {
      ctx.fillStyle = '#0f0f23'
      const eyeSize = size * 0.12
      const eyeOffset = size * 0.2
      ctx.beginPath()
      ctx.arc(x + size / 2 - eyeOffset, y + size / 2 - eyeOffset / 2, eyeSize, 0, Math.PI * 2)
      ctx.arc(x + size / 2 + eyeOffset, y + size / 2 - eyeOffset / 2, eyeSize, 0, Math.PI * 2)
      ctx.fill()
    }
  })

  // Game over overlay effect
  if (props.isGameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(0, 0, canvasSize.value, canvasSize.value)
  }
}

watch(() => [props.snake, props.food, props.isGameOver], () => {
  draw()
}, { deep: true })

onMounted(() => {
  draw()
  window.addEventListener('resize', draw)
})
</script>

<style scoped>
.game-canvas {
  border-radius: 12px;
  box-shadow: 
    0 0 30px rgba(0, 255, 136, 0.2),
    0 0 60px rgba(0, 255, 136, 0.1),
    inset 0 0 30px rgba(0, 0, 0, 0.5);
  touch-action: none;
}
</style>
