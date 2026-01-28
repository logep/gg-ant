import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface Point {
  x: number
  y: number
}

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface GameState {
  snake: Point[]
  food: Point
  direction: Direction
  score: number
  highScore: number
  isPlaying: boolean
  isPaused: boolean
  isGameOver: boolean
}

const GRID_SIZE = 20
const INITIAL_SPEED = 150
const SPEED_INCREASE = 5
const MIN_SPEED = 60

export function useGame(gridWidth: number = 20, gridHeight: number = 20) {
  const snake = ref<Point[]>([{ x: 10, y: 10 }])
  const food = ref<Point>({ x: 15, y: 10 })
  const direction = ref<Direction>('right')
  const nextDirection = ref<Direction>('right')
  const score = ref(0)
  const highScore = ref(parseInt(localStorage.getItem('snakeHighScore') || '0'))
  const isPlaying = ref(false)
  const isPaused = ref(false)
  const isGameOver = ref(false)
  
  let gameLoop: number | null = null
  let currentSpeed = INITIAL_SPEED

  const generateFood = (): Point => {
    let newFood: Point
    do {
      newFood = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight)
      }
    } while (snake.value.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }

  const resetGame = () => {
    snake.value = [{ x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) }]
    food.value = generateFood()
    direction.value = 'right'
    nextDirection.value = 'right'
    score.value = 0
    isGameOver.value = false
    isPaused.value = false
    currentSpeed = INITIAL_SPEED
  }

  const moveSnake = () => {
    direction.value = nextDirection.value
    const head = { ...snake.value[0] }

    switch (direction.value) {
      case 'up':
        head.y -= 1
        break
      case 'down':
        head.y += 1
        break
      case 'left':
        head.x -= 1
        break
      case 'right':
        head.x += 1
        break
    }

    // Check wall collision
    if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
      endGame()
      return
    }

    // Check self collision
    if (snake.value.some(segment => segment.x === head.x && segment.y === head.y)) {
      endGame()
      return
    }

    snake.value.unshift(head)

    // Check food collision
    if (head.x === food.value.x && head.y === food.value.y) {
      score.value += 10
      food.value = generateFood()
      
      // Increase speed every 50 points
      if (score.value % 50 === 0 && currentSpeed > MIN_SPEED) {
        currentSpeed = Math.max(MIN_SPEED, currentSpeed - SPEED_INCREASE)
        restartGameLoop()
      }
    } else {
      snake.value.pop()
    }
  }

  const restartGameLoop = () => {
    if (gameLoop) {
      clearInterval(gameLoop)
    }
    gameLoop = window.setInterval(() => {
      if (isPlaying.value && !isPaused.value && !isGameOver.value) {
        moveSnake()
      }
    }, currentSpeed)
  }

  const startGame = () => {
    if (isGameOver.value) {
      resetGame()
    }
    isPlaying.value = true
    isPaused.value = false
    restartGameLoop()
  }

  const pauseGame = () => {
    isPaused.value = true
  }

  const resumeGame = () => {
    isPaused.value = false
  }

  const endGame = () => {
    isGameOver.value = true
    isPlaying.value = false
    if (gameLoop) {
      clearInterval(gameLoop)
      gameLoop = null
    }
    
    // Update high score
    if (score.value > highScore.value) {
      highScore.value = score.value
      localStorage.setItem('snakeHighScore', String(highScore.value))
    }
  }

  const setDirection = (newDir: Direction) => {
    const opposites: Record<Direction, Direction> = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left'
    }
    
    // Prevent 180-degree turns
    if (opposites[newDir] !== direction.value) {
      nextDirection.value = newDir
    }
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (!isPlaying.value && !isGameOver.value && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(e.key)) {
      startGame()
      return
    }

    if (e.key === ' ' || e.key === 'Escape') {
      if (isGameOver.value) {
        startGame()
      } else if (isPaused.value) {
        resumeGame()
      } else {
        pauseGame()
      }
      return
    }

    const keyMap: Record<string, Direction> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      w: 'up',
      W: 'up',
      s: 'down',
      S: 'down',
      a: 'left',
      A: 'left',
      d: 'right',
      D: 'right'
    }

    if (keyMap[e.key]) {
      e.preventDefault()
      setDirection(keyMap[e.key])
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    if (gameLoop) {
      clearInterval(gameLoop)
    }
  })

  return {
    snake,
    food,
    direction,
    score,
    highScore,
    isPlaying,
    isPaused,
    isGameOver,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    setDirection,
    gridWidth,
    gridHeight
  }
}
