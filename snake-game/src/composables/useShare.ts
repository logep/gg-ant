import { ref } from 'vue'

export function useShare() {
    const isSharing = ref(false)
    const shareError = ref<string | null>(null)

    const generateShareUrl = (score: number): string => {
        const baseUrl = window.location.origin
        return `${baseUrl}/share?score=${score}&t=${Date.now()}`
    }

    const shareScore = async (score: number) => {
        const shareUrl = generateShareUrl(score)
        const shareData = {
            title: '🐍 贪吃蛇大作战',
            text: `我在贪吃蛇中获得了 ${score} 分！你能超越我吗？`,
            url: shareUrl
        }

        isSharing.value = true
        shareError.value = null

        try {
            // Try native Web Share API first (mainly for mobile)
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData)
                return true
            }

            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(`${shareData.text}\n${shareUrl}`)
            return true
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                shareError.value = '分享失败，请重试'
                console.error('Share failed:', error)
            }
            return false
        } finally {
            isSharing.value = false
        }
    }

    const copyShareLink = async (score: number): Promise<boolean> => {
        const shareUrl = generateShareUrl(score)
        const shareText = `🐍 我在贪吃蛇中获得了 ${score} 分！你能超越我吗？\n${shareUrl}`

        try {
            await navigator.clipboard.writeText(shareText)
            return true
        } catch (error) {
            console.error('Copy failed:', error)
            return false
        }
    }

    const getScoreFromUrl = (): number | null => {
        const params = new URLSearchParams(window.location.search)
        const scoreStr = params.get('score')
        if (scoreStr) {
            const score = parseInt(scoreStr, 10)
            return isNaN(score) ? null : score
        }
        return null
    }

    return {
        isSharing,
        shareError,
        shareScore,
        copyShareLink,
        generateShareUrl,
        getScoreFromUrl
    }
}
