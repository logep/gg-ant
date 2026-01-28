<template>
  <div class="day-detail" v-if="date">
    <div class="header-row">
      <div class="lunar-main">
        <span class="lunar-month">{{ lunarMonth }}</span>
        <span class="lunar-day">{{ lunarDay }}</span>
      </div>
      <div class="ganzhi">
        {{ ganzhiYear }}年 {{ animal }}
      </div>
    </div>

    <!-- Yi / Ji -->
    <div class="yj-section">
      <div class="yj-row">
        <span class="yj-badge yi">宜</span>
        <span class="yj-text">{{ yi }}</span>
      </div>
      <div class="yj-row">
        <span class="yj-badge ji">忌</span>
        <span class="yj-text">{{ ji }}</span>
      </div>
    </div>
    
    <!-- Countdown -->
    <div class="footer-info">
      距离 2026年春节 还有 {{ daysToSpringFestival }} 天
    </div>
    
    <!-- Export Button -->
    <div class="actions">
      <button class="export-btn" @click="emit('export')">
        导出到手机日历
      </button>
      <button class="share-btn" @click="emit('share')">
        分享给好友
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CalendarDay } from '../types/calendar'

const props = defineProps<{
  day: CalendarDay
}>()

const emit = defineEmits<{
  'export': []
  'share': []
}>()

const date = computed(() => props.day)
const lunarMonth = computed(() => date.value.lunar.getMonthInChinese() + '月')
const lunarDay = computed(() => date.value.lunar.getDayInChinese())
const ganzhiYear = computed(() => date.value.lunar.getYearInGanZhi())
const animal = computed(() => date.value.lunar.getYearShengXiao())

// Yi/Ji - limit to first 6 items
const yi = computed(() => date.value.lunar.getDayYi().slice(0, 8).join('.'))
const ji = computed(() => date.value.lunar.getDayJi().slice(0, 8).join('.'))

const daysToSpringFestival = computed(() => {
  // Simple calculation for 2026 Spring Festival (Feb 17, 2026)
  // For production, should calculate next spring festival dynamically
  const target = new Date('2026-02-17')
  const current = props.day.date
  const diff = target.getTime() - current.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
})

</script>

<style scoped>
.day-detail {
  background: #f8f9fa;
  margin: 16px;
  padding: 20px;
  border-radius: 16px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
}

.lunar-main {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
}

.ganzhi {
  color: var(--color-text-secondary);
  font-size: 14px;
}

.yj-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.yj-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.yj-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  flex-shrink: 0;
}

.yj-badge.yi {
  background: var(--color-success);
}

.yj-badge.ji {
  background: var(--color-text); /* Black/Dark text for Ji as per typical designs */
}

.yj-text {
  font-size: 13px;
  color: var(--color-text);
  line-height: 1.6;
}

.footer-info {
  font-size: 12px;
  color: var(--color-text-secondary);
  padding-top: 16px;
  border-top: 1px solid rgba(0,0,0,0.05);
  margin-bottom: 16px;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

button {
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}

.export-btn {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 4px 10px rgba(24, 144, 255, 0.3);
}

.share-btn {
  background: white;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
</style>
