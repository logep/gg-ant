import { Lunar, Solar, HolidayUtil } from 'lunar-typescript'

export interface CalendarDay {
    date: Date
    solar: Solar
    lunar: Lunar
    isCurrentMonth: boolean
    isToday: boolean
    isWeekend: boolean
    year: number
    month: number
    day: number
    // Holiday info
    isHoliday: boolean // true if it is a holiday date (might be work or rest)
    msg?: string // Holiday name
    isWork: boolean // true if "班" (work adjustment)
    isRest: boolean // true if "休" (rest day)
}

export interface CalendarState {
    year: number
    month: number // 1-12
    selectedDate: Date
}
