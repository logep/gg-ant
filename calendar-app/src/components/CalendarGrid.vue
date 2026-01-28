<template>
  <div class="calendar-wrapper" ref="containerRef">
    <!-- Week Header -->
    <div class="week-header">
      <div v-for="(day, index) in weekDays" :key="index" class="week-day" :class="{ weekend: index === 0 || index === 6 }">
        {{ day }}
      </div>
    </div>

    <!-- Days Grid -->
    <div class="grid-container">
      <Transition :name="transitionName" mode="out-in">
        <div :key="monthKey" class="days-grid">
          <div
            v-for="day in days"
            :key="day.date.toISOString()"
            class="day-cell"
            :class="{
              'other-month': !day.isCurrentMonth,
              'today': day.isToday,
              'selected': isSelected(day),
              'weekend': day.isWeekend
            }"
            @click="emit('select-day', day)"
          >
            <!-- Badge (Work/Rest) -->
            <span v-if="day.isRest" class="badge rest">休</span>
            <span v-if="day.isWork" class="badge work">班</span>

            <div class="solar-date">{{ day.day }}</div>
            
            <div class="lunar-info" :class="{ 'is-festival': !!day.msg }">
              {{ day.msg || day.lunar.getDayInChinese() }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRef, watch } from 'vue'
import type { CalendarDay } from '../types/calendar'
import { useSwipe } from '../composables/useSwipe'

const props = defineProps<{
  days: CalendarDay[]
  selectedDate: Date
  direction?: 'forward' | 'backward'
}>()

const emit = defineEmits<{
  'select-day': [day: CalendarDay]
  'swipe-left': []
  'swipe-right': []
  'swipe-up': []
  'swipe-down': []
}>()

const weekDays = ['一', '二', '三', '四', '五', '六', '日']
const containerRef = ref<HTMLElement | null>(null)

// Unique key for transition based on the first day of the month
const monthKey = computed(() => {
  if (props.days.length === 0) return ''
  // Find the first day that belongs to the current month to form a key
  const firstCurrent = props.days.find(d => d.isCurrentMonth)
  return firstCurrent ? `${firstCurrent.year}-${firstCurrent.month}` : ''
})

const transitionName = computed(() => {
  return props.direction === 'backward' ? 'slide-right' : 'slide-left'
})

const isSelected = (day: CalendarDay) => {
  return day.date.toDateString() === props.selectedDate.toDateString()
}

useSwipe(containerRef, {
  onSwipeLeft: () => emit('swipe-left'),
  onSwipeRight: () => emit('swipe-right'),
  onSwipeUp: () => emit('swipe-up'),
  onSwipeDown: () => emit('swipe-down'),
  threshold: 40
})
</script>

<style scoped>
.calendar-wrapper {
  padding: 0 16px;
  background: var(--color-surface);
  overflow: hidden; /* Contain swipe animations */
  touch-action: pan-y; /* Allow vertical scroll if not intercepted, but we might intercept */
}

/* Override touch-action for the container to allow our custom handling if needed, 
   but usually 'pan-y' is good for vertical lists. 
   Since we handle vertical swipe too, we might want 'none' or handle it carefully. */

.week-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: 12px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.week-day.weekend {
  color: var(--color-error);
}

.grid-container {
  position: relative;
  min-height: 380px;
  overflow: hidden;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 16px;
  width: 100%;
}

.day-cell {
  aspect-ratio: 1; /* Square cells */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.day-cell.other-month {
  opacity: 0.3;
}

.day-cell.selected {
  background: white;
  border: 2px solid var(--color-primary);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
  z-index: 1;
}

.day-cell.selected .solar-date {
  color: var(--color-primary);
}

.day-cell.today:not(.selected) {
  background: rgba(24, 144, 255, 0.1);
}

.solar-date {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 2px;
}

.weekend .solar-date {
  color: var(--color-error);
}

.lunar-info {
  font-size: 10px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
}

.lunar-info.is-festival {
  color: var(--color-error);
}

/* Badges */
.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 9px;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: white;
  transform: scale(0.8);
}

.badge.rest {
  background: var(--color-error);
}

.badge.work {
  background: #666;
}

/* Slide Animations */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
