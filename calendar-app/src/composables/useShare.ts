import { ref } from 'vue'

export function useShare() {
    const isSharing = ref(false)

    const shareCalendar = async (date: Date) => {
        const url = new URL(window.location.href)
        url.searchParams.set('date', date.toISOString().split('T')[0])

        const shareData = {
            title: '我的中国万年历',
            text: `查看 ${date.getFullYear()}年${date.getMonth() + 1}月 的日历`,
            url: url.toString()
        }

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            isSharing.value = true
            try {
                await navigator.share(shareData)
                return true
            } catch (err) {
                console.error(err)
                return false
            } finally {
                isSharing.value = false
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(url.toString())
                return 'copied'
            } catch (err) {
                return false
            }
        }
    }

    return {
        shareCalendar
    }
}
