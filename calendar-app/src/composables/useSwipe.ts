import { onMounted, onUnmounted, ref, Ref } from 'vue'

export interface SwipeOptions {
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onSwipeUp?: () => void
    onSwipeDown?: () => void
    threshold?: number
}

export function useSwipe(target: Ref<HTMLElement | null>, options: SwipeOptions) {
    const threshold = options.threshold || 50
    let startX = 0
    let startY = 0
    let isDragging = false

    // Touch Events
    const onTouchStart = (e: TouchEvent) => {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
        const endX = e.changedTouches[0].clientX
        const endY = e.changedTouches[0].clientY
        handleSwipe(startX, startY, endX, endY)
    }

    // Mouse Events
    const onMouseDown = (e: MouseEvent) => {
        isDragging = true
        startX = e.clientX
        startY = e.clientY
    }

    const onMouseUp = (e: MouseEvent) => {
        if (!isDragging) return
        isDragging = false
        const endX = e.clientX
        const endY = e.clientY
        handleSwipe(startX, startY, endX, endY)
    }

    const onMouseLeave = () => {
        isDragging = false
    }

    // Wheel Event (Debounced)
    let wheelTimeout: number | null = null
    const onWheel = (e: WheelEvent) => {
        // Prevent default scrolling if horizontal scroll is dominant
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault()
        }

        if (wheelTimeout) return

        wheelTimeout = window.setTimeout(() => {
            wheelTimeout = null
        }, 500) // 500ms debounce to prevent rapid switching

        if (Math.abs(e.deltaX) > threshold) {
            if (e.deltaX > 0 && options.onSwipeLeft) options.onSwipeLeft()
            if (e.deltaX < 0 && options.onSwipeRight) options.onSwipeRight()
        }
        // Vertical scroll support (if requested)
        else if (Math.abs(e.deltaY) > threshold) {
            if (e.deltaY > 0 && options.onSwipeUp) options.onSwipeUp() // Scroll down -> Next
            if (e.deltaY < 0 && options.onSwipeDown) options.onSwipeDown() // Scroll up -> Prev
        }
    }

    const handleSwipe = (x1: number, y1: number, x2: number, y2: number) => {
        const diffX = x1 - x2
        const diffY = y1 - y2

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0 && options.onSwipeLeft) options.onSwipeLeft()
                else if (diffX < 0 && options.onSwipeRight) options.onSwipeRight()
            }
        } else {
            // Vertical
            if (Math.abs(diffY) > threshold) {
                if (diffY > 0 && options.onSwipeUp) options.onSwipeUp()
                else if (diffY < 0 && options.onSwipeDown) options.onSwipeDown()
            }
        }
    }

    onMounted(() => {
        const el = target.value
        if (el) {
            el.addEventListener('touchstart', onTouchStart, { passive: true })
            el.addEventListener('touchend', onTouchEnd)
            el.addEventListener('mousedown', onMouseDown)
            el.addEventListener('mouseup', onMouseUp)
            el.addEventListener('mouseleave', onMouseLeave)
            el.addEventListener('wheel', onWheel, { passive: false })
        }
    })

    onUnmounted(() => {
        const el = target.value
        if (el) {
            el.removeEventListener('touchstart', onTouchStart)
            el.removeEventListener('touchend', onTouchEnd)
            el.removeEventListener('mousedown', onMouseDown)
            el.removeEventListener('mouseup', onMouseUp)
            el.removeEventListener('mouseleave', onMouseLeave)
            el.removeEventListener('wheel', onWheel)
        }
    })
}
