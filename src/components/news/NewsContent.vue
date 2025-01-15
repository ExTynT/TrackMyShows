<template>
  <v-card v-if="news" class="news-content pa-6" elevation="0" rounded="lg">
    <v-img
      v-if="news.image_url"
      :src="news.image_url"
      :alt="news.title"
      class="mb-6 rounded-lg"
      height="400"
      cover
    ></v-img>

    <h1 class="text-h4 font-weight-bold mb-4 primary--text">{{ news.title }}</h1>

    <div class="d-flex align-center mb-6">
      <v-icon icon="mdi-account" class="mr-2" color="grey"></v-icon>
      <span class="text-grey mr-6">{{ news.author }}</span>
      <v-icon icon="mdi-calendar" class="mr-2" color="grey"></v-icon>
      <span class="text-grey">{{ formatDate(news.date) }}</span>
    </div>

    <v-divider class="mb-6"></v-divider>

    <div class="text-subtitle-1 mb-4 text-grey-darken-3">{{ news.description }}</div>

    <div class="news-content__body text-body-1" v-html="news.full_content"></div>
  </v-card>
  <v-skeleton-loader v-else type="article" class="mt-4"></v-skeleton-loader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNewsStore } from '../../stores/news'
import type { NewsItem } from '../../types/news'

interface NewsContentState {
  newsStore: ReturnType<typeof useNewsStore>
  dateFormatOptions: Intl.DateTimeFormatOptions
}

export default defineComponent({
  name: 'NewsContent',

  props: {
    news: {
      type: Object as () => NewsItem | null,
      required: false,
      default: null,
    },
  },

  data(): NewsContentState {
    const store = useNewsStore()
    return {
      newsStore: store,
      dateFormatOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    }
  },

  methods: {
    formatDate(dateString: string): string {
      return new Date(dateString).toLocaleDateString('en-US', this.dateFormatOptions)
    },
  },

  async mounted() {
    if (this.news?.id && !this.newsStore.news.find((n) => n.id === this.news?.id)) {
      await this.newsStore.fetchNewsDetail(this.news.id.toString())
    }
  },
})
</script>

<style scoped>
.news-content {
  max-width: 900px;
  margin: 0 auto;
}

.news-content__body {
  line-height: 1.8;
  color: #37474f;
}

.news-content__body :deep(p) {
  margin-bottom: 1.5rem;
}

.news-content__body :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: var(--v-primary-base);
}

.news-content__body :deep(ul),
.news-content__body :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.news-content__body :deep(li) {
  margin-bottom: 0.5rem;
}

.news-content__body :deep(a) {
  color: var(--v-primary-base);
  text-decoration: none;
}

.news-content__body :deep(a:hover) {
  text-decoration: underline;
}
</style>
