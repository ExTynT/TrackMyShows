<template>
  <section class="news-section">
    <h2 class="section-title">Latest News</h2>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="loader"
    ></v-progress-circular>
    <div v-else class="news-grid">
      <v-card
        v-for="news in latestNews"
        :key="news.id"
        :to="{ name: 'news-detail', params: { slug: news.link_slug } }"
        class="news-card"
        elevation="0"
      >
        <div class="news-image">
          <v-img :src="news.image_url" height="180" cover></v-img>
        </div>
        <div class="news-content">
          <h3 class="news-title">{{ news.title }}</h3>
          <p class="news-description">{{ news.description }}</p>
          <div class="news-meta">
            <span class="news-date">{{ formatDate(news.date) }}</span>
          </div>
        </div>
      </v-card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNewsStore } from '../stores/news'
import type { NewsItem } from '../types/news'

export default defineComponent({
  name: 'LatestNews',

  data() {
    const store = useNewsStore()
    return {
      newsStore: store,
      loading: true,
    }
  },

  computed: {
    latestNews(): NewsItem[] {
      return this.newsStore.news.slice(0, 4)
    },
  },

  methods: {
    formatDate(dateString: string): string {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return new Date(dateString).toLocaleDateString('en-US', options)
    },

    async fetchData() {
      this.loading = true
      try {
        await this.newsStore.fetchNews()
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        this.loading = false
      }
    },
  },

  mounted() {
    this.fetchData()
  },
})
</script>

<style scoped>
.news-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 32px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60%;
  height: 4px;
  background: linear-gradient(90deg, var(--v-primary-base) 0%, transparent 100%);
  border-radius: 2px;
}

.loader {
  display: block;
  margin: 40px auto;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.news-card {
  background: var(--v-surface-base);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.news-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.news-image {
  position: relative;
  overflow: hidden;
}

.news-image .v-img {
  transition: transform 0.5s ease;
}

.news-card:hover .news-image .v-img {
  transform: scale(1.05);
}

.news-content {
  padding: 24px;
}

.news-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.4;
  color: var(--v-primary-base);
  letter-spacing: -0.5px;
}

.news-description {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: 0.2px;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.news-date {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .section-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .news-title {
    font-size: 18px;
  }
}
</style>
