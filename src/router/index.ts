import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MediaDetailView from '@/views/MediaDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:type(anime|manga)/:id',
      name: 'media-detail',
      component: MediaDetailView,
    },
  ],
})

export default router
