import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AnimeView from '@/views/AnimeView.vue'
import AnimeDetailView from '../views/AnimeDetailView.vue'
import NewsDetailView from '../views/NewsDetailView.vue'
import BlogDetailView from '../views/BlogDetailView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import UserAnimeListView from '@/views/UserAnimeListView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/anime',
      name: 'anime',
      component: AnimeView,
    },
    {
      path: '/manga',
      name: 'manga',
      component: () => import('@/views/MangaView.vue'),
    },
    {
      path: '/manga/:id',
      name: 'manga-detail',
      component: () => import('@/views/MangaDetailView.vue'),
    },
    {
      path: '/anime/:id',
      name: 'anime-detail',
      component: AnimeDetailView,
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
      path: '/signin',
      name: 'signin',
      component: SignInView,
      meta: { requiresGuest: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: { requiresGuest: true },
    },
    {
      path: '/my-list',
      name: 'my-anime-list',
      component: UserAnimeListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/user/anime',
      name: 'user-anime-list',
      component: () => import('@/views/UserAnimeListView.vue'),
    },
    {
      path: '/user/manga',
      name: 'user-manga-list',
      component: () => import('@/views/UserMangaListView.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/ListView.vue'),
    },
  ],
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.initialize()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/signin')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
