<template>
  <section class="news-section">
    <h2 class="section-title">Latest News</h2>
    <v-progress-circular
      v-if="newsStore.loading"
      indeterminate
      color="primary"
      class="loader"
    ></v-progress-circular>
    <div v-else class="news-grid">
      <v-card
        v-for="news in newsStore.news"
        :key="news.id"
        :to="{ name: 'news-detail', params: { slug: news.link_slug } }"
        class="news-card"
      >
        <div class="news-image">
          <v-img :src="news.image_url" height="180" cover></v-img>
        </div>
        <div class="news-content">
          <h3 class="news-title">{{ news.title }}</h3>
          <p class="news-description">{{ news.description }}</p>
          <div class="news-meta">
            <span class="news-date">{{ news.date }}</span>
          </div>
        </div>
      </v-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useNewsStore } from '@/stores/news'
import { onMounted } from 'vue'

const newsStore = useNewsStore()

onMounted(() => {
  newsStore.fetchNews()
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.news-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
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
  transition: color 0.2s ease;
}

.news-description {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
}

.news-meta {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.news-date {
  display: flex;
  align-items: center;
  gap: 6px;
}

.news-date::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: var(--v-primary-base);
  border-radius: 50%;
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

  .news-content {
    padding: 20px;
  }

  .news-title {
    font-size: 18px;
  }
}
</style>
