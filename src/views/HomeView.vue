<template>
  <div class="home-view">
    <v-container>
      <!-- Loading State -->
      <div v-if="loading" class="d-flex justify-center align-center py-12">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="d-flex flex-column align-center py-12">
        <v-icon size="64" color="error" class="mb-4">mdi-alert-circle</v-icon>
        <h2 class="text-h5 text-error mb-2">Error Loading Content</h2>
        <p class="text-body-1 text-grey mb-4">{{ error }}</p>
        <v-btn color="primary" @click="initialize">Retry</v-btn>
      </div>

      <!-- Content -->
      <template v-else>
        <hero-carousel />
        <latest-news />
        <blogs-and-reviews />
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
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

  data() {
    return {
      newsStore: useNewsStore(),
      blogStore: useBlogStore(),
      loading: true,
      error: null as string | null,
    }
  },

  methods: {
    async initialize() {
      this.loading = true
      this.error = null

      try {
        await Promise.all([this.newsStore.fetchNews(), this.blogStore.fetchPosts()])
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load content'
      } finally {
        this.loading = false
      }
    },
  },

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
