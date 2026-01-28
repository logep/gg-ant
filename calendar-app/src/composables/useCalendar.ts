import { ref, computed } from 'vue'
import { Solar, Lunar, HolidayUtil } from 'lunar-typescript'
import type { CalendarDay } from '../types/calendar'

export function useCalendar() {
    const currentYear = ref(new Date().getFullYear())
    const currentMonth = ref(new Date().getMonth() + 1) // 1-12
    const selectedDate = ref(new Date())

    const toToday = () => {
        const now = new Date()
        currentYear.value = now.getFullYear()
        currentMonth.value = now.getMonth() + 1
        selectedDate.value = now
    }

    const prevMonth = () => {
        if (currentMonth.value === 1) {
            currentYear.value--
            currentMonth.value = 12
        } else {
            currentMonth.value--
        }
    }

    const nextMonth = () => {
        if (currentMonth.value === 12) {
            currentYear.value++
            currentMonth.value = 1
        } else {
            currentMonth.value++
        }
    }

    const calendarDays = computed<CalendarDay[]>(() => {
        const days: CalendarDay[] = []
        const firstDayOfMonth = new Date(currentYear.value, currentMonth.value - 1, 1)
        const lastDayOfMonth = new Date(currentYear.value, currentMonth.value, 0)

        // Calculate padding for previous month
        // Sunday is 0, we want Monday to be start of week? 
        // Usually standard definition: Sunday=0. Let's start with Monday as per screenshot (一 二 ... 日)
        // firstDay.getDay(): Sun=0, Mon=1...Sat=6
        // If Mon(1) is start. Padding needed = (getDay() + 6) % 7?
        // Let's trace:
        // Mon(1) -> 0 padding. (1-1 = 0)
        // Sun(0) -> 6 padding. (0-1 = -1 -> 6)
        // Formula: (firstDay.getDay() + 6) % 7

        let startDayOfWeek = firstDayOfMonth.getDay()
        let paddingDays = (startDayOfWeek === 0 ? 7 : startDayOfWeek) - 1 // Monday start

        // Previous month days
        const prevMonthLastDay = new Date(currentYear.value, currentMonth.value - 1, 0)
        for (let i = paddingDays - 1; i >= 0; i--) {
            const d = new Date(currentYear.value, currentMonth.value - 1, -i)
            days.push(createCalendarDay(d, false))
        }

        // Current month days
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const d = new Date(currentYear.value, currentMonth.value - 1, i)
            days.push(createCalendarDay(d, true))
        }

        // Next month days to fill 42 (6 rows) or just 35 (5 rows)
        const remainingSlots = 42 - days.length
        for (let i = 1; i <= remainingSlots; i++) {
            const d = new Date(currentYear.value, currentMonth.value, i)
            days.push(createCalendarDay(d, false))
        }

        return days
    })

    function createCalendarDay(date: Date, isCurrentMonth: boolean): CalendarDay {
        const solar = Solar.fromDate(date)
        const lunar = solar.getLunar()
        const today = new Date()
        const isToday = date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()

        const dayOfWeek = date.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        // Holiday Logic
        // HolidayUtil.getHoliday returns details if it matches a holiday or workday adjustment
        const holiday = HolidayUtil.getHoliday(date.getFullYear(), date.getMonth() + 1, date.getDate())

        let isHoliday = false
        let isWork = false
        let isRest = false
        let msg = ''

        if (holiday) {
            isHoliday = true
            isWork = holiday.isWork()
            isRest = !isWork
            msg = holiday.getName()
        }

        return {
            date,
            solar,
            lunar,
            isCurrentMonth,
            isToday,
            isWeekend,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            isHoliday,
            isWork,
            isRest,
            msg
        }
    }

    const selectDate = (day: CalendarDay) => {
        selectedDate.value = day.date
        if (!day.isCurrentMonth) {
            currentYear.value = day.year
            currentMonth.value = day.month
        }
    }

    return {
        currentYear,
        currentMonth,
        selectedDate,
        calendarDays,
        toToday,
        prevMonth,
        nextMonth,
        selectDate
    }
}
