<template>
  <header class="header">
    <div class="left">
      <button class="menu-btn">
        <span class="icon">☰</span>
        假期
      </button>
    </div>
    
    <div class="center">
      <div class="selector year-selector" @click="emit('year-click')">
        {{ year }}年
      </div>
      <div class="selector month-selector" @click="emit('month-click')">
        {{ month }}月
      </div>
    </div>

    <div class="right">
      <button class="today-btn" @click="emit('today')">今天</button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  year: number
  month: number
}>()

const emit = defineEmits<{
  'today': []
  'year-click': []
  'month-click': []
}>()
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: var(--color-surface);
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}

.center {
  display: flex;
  gap: 12px;
}

.selector {
  border: 1px solid var(--color-border);
  padding: 6px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.selector:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.today-btn {
  border: 1px solid var(--color-border);
  background: #fff;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: var(--color-text-secondary);
  transition: all 0.2s;
}

.today-btn:active {
  background: #f0f0f0;
}

.menu-btn {
  border: 1px solid var(--color-border);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
