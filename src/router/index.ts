import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnimeView from '../views/AnimeView.vue'
import NewsDetailView from '../views/NewsDetailView.vue'
import BlogDetailView from '../views/BlogDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/news/:slug',
      name: 'news-detail',
      component: NewsDetailView,
    },
    {
      path: '/blog/:id',
      name: 'blog-detail',
      component: BlogDetailView,
    },
    {
      path: '/anime',
      name: 'anime',
      component: AnimeView,
    },
    {
      path: '/anime/genre/:id',
      name: 'anime-genre',
      component: () => import('../views/AnimeGenreView.vue'),
    },
    {
      path: '/anime/:id',
      name: 'anime-detail',
      component: () => import('../views/AnimeDetailView.vue'),
    },
  ],
})

export default router
