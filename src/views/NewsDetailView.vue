<template>
  <div class="news-detail">
    <v-progress-circular
      v-if="newsStore.loading"
      indeterminate
      color="primary"
      class="loader"
    ></v-progress-circular>
    <div v-else-if="newsStore.currentNews" class="news-content">
      <div class="news-header">
        <div class="breadcrumb">
          <router-link to="/" class="home-link">
            <v-icon>mdi-home</v-icon>
          </router-link>
          <v-icon class="separator">mdi-chevron-right</v-icon>
          <span>News</span>
        </div>
        <h1 class="news-title">{{ newsStore.currentNews.title }}</h1>
        <div class="news-meta">
          <span class="news-date">
            <v-icon size="small" class="meta-icon">mdi-calendar</v-icon>
            {{ formatDate(newsStore.currentNews.date) }}
          </span>
          <span class="news-share">
            <v-btn icon="mdi-share-variant" size="small" variant="text"></v-btn>
            <v-btn icon="mdi-bookmark-outline" size="small" variant="text"></v-btn>
          </span>
        </div>
      </div>

      <div v-if="newsStore.currentNews.image_url" class="news-image">
        <v-img :src="newsStore.currentNews.image_url" height="500" cover class="image-shadow">
          <template v-slot:placeholder>
            <div class="image-placeholder">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </template>
        </v-img>
      </div>

      <div class="news-body" v-html="newsStore.currentNews.full_content"></div>

      <div class="news-footer">
        <div class="tags">
          <v-chip v-for="tag in ['Anime', 'News', 'Updates']" :key="tag" size="small" class="mr-2">
            {{ tag }}
          </v-chip>
        </div>
        <div class="social-share">
          <v-btn
            v-for="social in ['Twitter', 'Facebook', 'Reddit']"
            :key="social"
            :icon="'mdi-' + social.toLowerCase()"
            size="small"
            variant="text"
            class="share-button"
          ></v-btn>
        </div>
      </div>
    </div>
    <div v-else class="error-message">
      <v-icon size="large" color="error" class="mb-4">mdi-alert-circle</v-icon>
      <p>News article not found</p>
      <v-btn color="primary" to="/" prepend-icon="mdi-home" class="mt-4"> Return Home </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '@/stores/news'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const newsStore = useNewsStore()

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

onMounted(async () => {
  const slug = route.params.slug as string
  await newsStore.fetchNewsDetail(slug)
})
</script>

<style scoped>
.news-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 90vh;
}

.loader {
  display: block;
  margin: 40px auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.home-link {
  color: inherit;
  text-decoration: none;
}

.separator {
  opacity: 0.5;
  font-size: 18px;
}

.news-header {
  margin-bottom: 40px;
  text-align: center;
}

.news-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 24px;
  line-height: 1.2;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.news-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.meta-icon {
  margin-right: 4px;
  opacity: 0.7;
}

.news-image {
  margin: 40px 0;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  position: relative;
}

.image-shadow {
  position: relative;
}

.image-shadow::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  pointer-events: none;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}

.news-body {
  font-size: 18px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
}

.news-body :deep(h2) {
  font-size: 36px;
  font-weight: 700;
  margin: 48px 0 24px;
  color: var(--v-primary-base);
}

.news-body :deep(h3) {
  font-size: 28px;
  font-weight: 600;
  margin: 36px 0 20px;
  color: #7e57c2;
}

.news-body :deep(p) {
  margin-bottom: 24px;
  letter-spacing: 0.3px;
}

.news-body :deep(p:first-of-type) {
  font-size: 22px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
}

.news-footer {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags {
  display: flex;
  gap: 8px;
}

.social-share {
  display: flex;
  gap: 16px;
}

.share-button {
  opacity: 0.7;
  transition: opacity 0.2s;
}

.share-button:hover {
  opacity: 1;
}

.error-message {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .news-detail {
    padding: 20px 16px;
  }

  .news-title {
    font-size: 32px;
  }

  .news-body {
    font-size: 16px;
  }

  .news-body :deep(h2) {
    font-size: 28px;
    margin: 36px 0 20px;
  }

  .news-body :deep(h3) {
    font-size: 22px;
    margin: 28px 0 16px;
  }

  .news-body :deep(p:first-of-type) {
    font-size: 18px;
  }

  .news-footer {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }
}
</style>
