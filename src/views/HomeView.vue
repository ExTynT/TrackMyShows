<template>
  <div class="content-wrapper">
    <hero-carousel />
    <latest-news />
    <blogs-and-reviews />
  </div>
</template>

<script lang="ts">
import HeroCarousel from '@/components/HeroCarousel.vue'
import LatestNews from '@/components/LatestNews.vue'
import BlogsAndReviews from '@/components/BlogsAndReviews.vue'

export default {
  name: 'HomeView',
  components: {
    HeroCarousel,
    LatestNews,
    BlogsAndReviews,
  },
}
</script>

<style scoped>
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px;
}
</style>
