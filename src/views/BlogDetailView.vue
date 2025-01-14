<template>
  <div class="blog-detail">
    <v-progress-circular
      v-if="blogStore.loading"
      indeterminate
      color="primary"
      class="loader"
    ></v-progress-circular>
    <div v-else-if="blogStore.currentPost" class="blog-content">
      <div class="blog-header">
        <div class="breadcrumb">
          <router-link to="/" class="home-link">
            <v-icon>mdi-home</v-icon>
          </router-link>
          <v-icon class="separator">mdi-chevron-right</v-icon>
          <span>{{ blogStore.currentPost.category === 'blog' ? 'Blog' : 'Review' }}</span>
        </div>

        <div class="header-content">
          <div class="meta-info">
            <span class="category-tag" :class="blogStore.currentPost.category">
              {{ blogStore.currentPost.category }}
            </span>
            <span class="post-date">
              <v-icon size="small">mdi-calendar</v-icon>
              {{ formatDate(blogStore.currentPost.date) }}
            </span>
          </div>

          <h1 class="blog-title">{{ blogStore.currentPost.title }}</h1>

          <div class="author-info">
            <v-avatar color="primary" size="36">
              <span class="text-h6">{{ getInitials(blogStore.currentPost.author) }}</span>
            </v-avatar>
            <div class="author-details">
              <span class="author-name">{{ blogStore.currentPost.author }}</span>
              <span class="author-role">Contributor</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="blogStore.currentPost.image_url" class="blog-image">
        <v-img :src="blogStore.currentPost.image_url" height="400" cover class="image-shadow">
          <template v-slot:placeholder>
            <div class="image-placeholder">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </template>
        </v-img>
      </div>

      <div v-if="blogStore.currentPost.category === 'review'" class="review-score">
        <div class="score-circle">
          <span class="score-number">{{ blogStore.currentPost.rating }}</span>
          <span class="score-max">/10</span>
        </div>
        <div class="score-label">Overall Score</div>
      </div>

      <div class="blog-body" v-html="blogStore.currentPost.full_content"></div>

      <div class="blog-footer">
        <div class="share-section">
          <span class="share-label">Share this article</span>
          <div class="share-buttons">
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

        <div class="tags-section">
          <v-chip
            v-for="tag in ['Anime', 'Review', 'Series']"
            :key="tag"
            size="small"
            variant="outlined"
            class="ma-1"
          >
            {{ tag }}
          </v-chip>
        </div>
      </div>
    </div>
    <div v-else class="error-message">
      <v-icon size="large" color="error" class="mb-4">mdi-alert-circle</v-icon>
      <p>Blog post not found</p>
      <v-btn color="primary" to="/" prepend-icon="mdi-home" class="mt-4"> Return Home </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from '@/stores/blog'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const blogStore = useBlogStore()

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

onMounted(async () => {
  const id = parseInt(route.params.id as string)
  await blogStore.fetchPostDetail(id)
})
</script>

<style scoped>
.blog-detail {
  max-width: 800px;
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
  margin-bottom: 32px;
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

.blog-header {
  margin-bottom: 48px;
}

.header-content {
  text-align: left;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.category-tag {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 4px 8px;
  border-radius: 4px;
}

.category-tag.blog {
  background: var(--v-primary-base);
  color: white;
}

.category-tag.review {
  background: #7e57c2;
  color: white;
}

.post-date {
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.blog-title {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 24px;
  line-height: 1.2;
  color: white;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: white;
}

.author-role {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.blog-image {
  margin: 32px 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}

.review-score {
  background: linear-gradient(135deg, var(--v-primary-base), #7e57c2);
  padding: 24px;
  border-radius: 16px;
  margin: 32px 0;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.score-circle {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 8px;
}

.score-max {
  font-size: 24px;
  opacity: 0.8;
}

.score-label {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
  opacity: 0.9;
}

.blog-body {
  font-size: 18px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
}

.blog-body :deep(h2) {
  font-size: 32px;
  font-weight: 700;
  margin: 48px 0 24px;
  color: white;
}

.blog-body :deep(h3) {
  font-size: 24px;
  font-weight: 600;
  margin: 36px 0 20px;
  color: var(--v-primary-base);
}

.blog-body :deep(h4) {
  font-size: 20px;
  font-weight: 600;
  margin: 24px 0 16px;
  color: #7e57c2;
}

.blog-body :deep(p) {
  margin-bottom: 24px;
  letter-spacing: 0.3px;
}

.blog-body :deep(ul) {
  margin: 16px 0;
  padding-left: 24px;
}

.blog-body :deep(li) {
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
}

.blog-footer {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.share-section {
  margin-bottom: 24px;
}

.share-label {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
}

.share-buttons {
  display: flex;
  gap: 12px;
}

.share-button {
  opacity: 0.7;
  transition: opacity 0.2s;
}

.share-button:hover {
  opacity: 1;
}

.tags-section {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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
  .blog-detail {
    padding: 20px 16px;
  }

  .blog-title {
    font-size: 32px;
  }

  .blog-body {
    font-size: 16px;
  }

  .blog-body :deep(h2) {
    font-size: 28px;
    margin: 36px 0 20px;
  }

  .blog-body :deep(h3) {
    font-size: 22px;
    margin: 28px 0 16px;
  }

  .blog-body :deep(h4) {
    font-size: 18px;
    margin: 20px 0 12px;
  }
}
</style>
