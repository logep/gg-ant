import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/GameView.vue'
import ShareView from '../views/ShareView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'game',
            component: GameView
        },
        {
            path: '/share',
            name: 'share',
            component: ShareView
        }
    ]
})

export default router
