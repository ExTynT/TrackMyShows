<template>
  <div class="home-view">
    <v-container>
      <!-- Načítavací stav -->
      <div v-if="loading" class="d-flex justify-center align-center py-12">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </div>

      <!-- Chybový stav s možnosťou opakovania -->
      <div v-else-if="error" class="d-flex flex-column align-center py-12">
        <v-icon size="64" color="error" class="mb-4">mdi-alert-circle</v-icon>
        <h2 class="text-h5 text-error mb-2">Error Loading Content</h2>
        <p class="text-body-1 text-grey mb-4">{{ error }}</p>
        <v-btn color="primary" @click="initialize">Retry</v-btn>
      </div>

      <!-- Hlavný obsah domovskej stránky -->
      <template v-else>
        <!-- Carousel s populárnym obsahom -->
        <hero-carousel />
        <!-- Najnovšie novinky -->
        <latest-news />
        <!-- Blogy a recenzie -->
        <blogs-and-reviews />
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
// Importy komponentov a store manažérov
import { defineComponent } from 'vue'
import HeroCarousel from '@/components/HeroCarousel.vue'
import LatestNews from '@/components/LatestNews.vue'
import BlogsAndReviews from '@/components/BlogsAndReviews.vue'
import { useNewsStore } from '@/stores/news'
import { useBlogStore } from '@/stores/blog'

export default defineComponent({
  name: 'HomeView',

  components: {
    HeroCarousel,
    LatestNews,
    BlogsAndReviews,
  },

  // Základný stav komponentu
  data() {
    return {
      newsStore: useNewsStore(),
      blogStore: useBlogStore(),
      loading: true,
      error: null as string | null,
    }
  },

  methods: {
    // Inicializácia a načítanie dát pre domovskú stránku
    async initialize() {
      this.loading = true
      this.error = null

      try {
        // Paralelné načítanie noviniek a blogov
        await Promise.all([this.newsStore.fetchNews(), this.blogStore.fetchPosts()])
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load content'
      } finally {
        this.loading = false
      }
    },
  },

  // Spustenie inicializácie pri načítaní stránky
  mounted() {
    this.initialize()
  },
})
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: #121212;
  color: white;
}
</style>
