import { saveAs } from 'file-saver'
import { v4 as uuidv4 } from 'uuid'

export interface CalendarEvent {
    id: string
    title: string
    description?: string
    start: Date
    end?: Date
    isAllDay: boolean
}

// Simple ICS generator since browser environment has limitations with 'ics' package sometimes
function generateICS(events: CalendarEvent[]): string {
    let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Calendar App//CN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n'

    const formatDate = (date: Date, isAllDay: boolean): string => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        if (isAllDay) {
            return `;VALUE=DATE:${year}${month}${day}`
        }
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `:${year}${month}${day}T${hours}${minutes}${seconds}`
    }

    events.forEach(event => {
        ics += 'BEGIN:VEVENT\n'
        ics += `UID:${event.id}\n`
        ics += `DTSTAMP:${formatDate(new Date(), false).substring(1)}Z\n`
        ics += `DTSTART${formatDate(event.start, event.isAllDay)}\n`
        if (event.end) {
            ics += `DTEND${formatDate(event.end, event.isAllDay)}\n`
        }
        ics += `SUMMARY:${event.title}\n`
        if (event.description) {
            ics += `DESCRIPTION:${event.description}\n`
        }
        ics += 'END:VEVENT\n'
    })

    ics += 'END:VCALENDAR'
    return ics
}

export function useEvents() {
    const exportToICS = (event: CalendarEvent) => {
        const icsContent = generateICS([event])
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
        saveAs(blob, `${event.title}.ics`)
    }

    const exportAllEvents = (events: CalendarEvent[]) => {
        const icsContent = generateICS(events)
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
        saveAs(blob, `calendar-export-${new Date().toISOString().split('T')[0]}.ics`)
    }

    return {
        exportToICS,
        exportAllEvents,
        generateICS
    }
}
