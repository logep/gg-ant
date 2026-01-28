<template>
  <div class="app-container">
    <CalendarHeader
      :year="currentYear"
      :month="currentMonth"
      @year-click="promptYear"
      @month-click="promptMonth"
      @today="toToday"
    />

    <main class="main-content">
      <CalendarGrid
        :days="calendarDays"
        :selected-date="selectedDate"
        :direction="transitionDirection"
        @select-day="selectDate"
        @swipe-left="handleNextMonth"
        @swipe-right="handlePrevMonth"
        @swipe-up="handleNextMonth"
        @swipe-down="handlePrevMonth"
      />

      <DayDetail
        v-if="selectedDay"
        :day="selectedDay"
        @export="handleExport"
        @share="handleShare"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CalendarHeader from './components/CalendarHeader.vue'
import CalendarGrid from './components/CalendarGrid.vue'
import DayDetail from './components/DayDetail.vue'
import { useCalendar, CalendarDay } from './composables/useCalendar'
import { useEvents } from './composables/useEvents'
import { useShare } from './composables/useShare'
import { v4 as uuidv4 } from 'uuid'

const {
  currentYear,
  currentMonth,
  selectedDate,
  calendarDays,
  toToday,
  selectDate,
  prevMonth,
  nextMonth
} = useCalendar()

const transitionDirection = ref<'forward' | 'backward'>('forward')

const handlePrevMonth = () => {
  transitionDirection.value = 'backward'
  prevMonth()
}

const handleNextMonth = () => {
  transitionDirection.value = 'forward'
  nextMonth()
}

const { exportToICS } = useEvents()
const { shareCalendar } = useShare()

const selectedDay = computed(() => {
  return calendarDays.value.find(d => 
    d.date.toDateString() === selectedDate.value.toDateString()
  )
})

const promptYear = () => {
  const y = prompt('输入年份', String(currentYear.value))
  if (y && !isNaN(parseInt(y))) {
    currentYear.value = parseInt(y)
  }
}

const promptMonth = () => {
  const m = prompt('输入月份 (1-12)', String(currentMonth.value))
  if (m && !isNaN(parseInt(m))) {
    const val = parseInt(m)
    if (val >= 1 && val <= 12) currentMonth.value = val
  }
}

const handleExport = () => {
  if (!selectedDay.value) return
  const day = selectedDay.value
  const title = `农历${day.lunar.getMonthInChinese()}月${day.lunar.getDayInChinese()}`
  
  exportToICS({
    id: uuidv4(),
    title: title,
    description: `${day.lunar.getYearInGanZhi()}年 ${day.lunar.getYearShengXiao()} \n宜:${day.lunar.getDayYi().join(',')}\n忌:${day.lunar.getDayJi().join(',')}`,
    start: day.date,
    end: day.date,
    isAllDay: true
  })
}

const handleShare = async () => {
  if (selectedDay.value) {
    const result = await shareCalendar(selectedDay.value.date)
    if (result === 'copied') {
      alert('链接已复制到剪贴板')
    }
  }
}
</script>

<style scoped>
.app-container {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background: var(--color-bg);
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
}

.main-content {
  padding-bottom: 20px;
}
</style>
