<template>
  <div class="news-detail">
    <v-container>
      <!-- Načítavací stav -->
      <div
        v-if="newsStore.loading"
        class="d-flex justify-center align-center"
        style="min-height: 400px"
      >
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </div>

      <!-- Chybový stav -->
      <news-error
        v-else-if="newsStore.error"
        :message="newsStore.error"
        description="There was an error loading the news article. Please try again later."
      />

      <!-- Obsah článku -->
      <template v-else-if="newsStore.currentNews">
        <news-breadcrumbs :news-title="newsStore.currentNews.title" />
        <news-content :news="newsStore.currentNews" />
        <news-navigation
          :previous-news-id="newsStore.currentNews.previous_id"
          :next-news-id="newsStore.currentNews.next_id"
        />
      </template>

      <!-- Článok nenájdený -->
      <news-error v-else />
    </v-container>
  </div>
</template>

<script lang="ts">
// Importy komponentov a závislostí
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/stores/news'
import NewsBreadcrumbs from '@/components/news/NewsBreadcrumbs.vue'
import NewsContent from '@/components/news/NewsContent.vue'
import NewsNavigation from '@/components/news/NewsNavigation.vue'
import NewsError from '@/components/news/NewsError.vue'

export default defineComponent({
  name: 'NewsDetailView',

  // Registrácia komponentov
  components: {
    NewsBreadcrumbs,
    NewsContent,
    NewsNavigation,
    NewsError,
  },

  // Základný stav komponenty
  data() {
    return {
      route: useRoute(),
      newsStore: useNewsStore(),
    }
  },

  // Načítanie detailu článku pri vytvorení komponenty
  async mounted() {
    const slug = this.route.params.slug as string
    await this.newsStore.fetchNewsDetail(slug)
  },
})
</script>

<style scoped>
.news-detail {
  min-height: 90vh;
  background: #121212;
  color: white;
}
</style>
