<template>
  <section class="blogs-section">
    <h2 class="section-title">Blogs and Reviews</h2>
    <v-progress-circular
      v-if="blogStore.loading"
      indeterminate
      color="primary"
      class="loader"
    ></v-progress-circular>
    <div v-else class="blogs-grid">
      <div
        v-for="blog in blogStore.blogs"
        :key="blog.id"
        class="blog-card"
        @click="router.push({ name: 'blog-detail', params: { id: blog.id } })"
      >
        <div class="blog-header">
          <div class="blog-info">
            <h3 class="blog-title">{{ blog.title }}</h3>
            <p class="blog-author">{{ blog.author }}</p>
          </div>
        </div>
        <p class="blog-content">{{ blog.content }}</p>
        <div class="blog-footer">
          <span class="blog-date">{{ blog.date }}</span>
          <v-icon color="primary" size="small">mdi-arrow-right</v-icon>
        </div>
      </div>

      <div
        v-for="review in blogStore.reviews"
        :key="review.id"
        class="blog-card review-card"
        @click="router.push({ name: 'blog-detail', params: { id: review.id } })"
      >
        <div class="blog-header">
          <div class="blog-info">
            <h3 class="blog-title">{{ review.title }}</h3>
            <p class="blog-author">{{ review.author }}</p>
          </div>
          <div v-if="review.rating" class="review-rating">{{ review.rating }}/10</div>
        </div>
        <p class="blog-content">{{ review.content }}</p>
        <div class="blog-footer">
          <span class="blog-date">{{ review.date }}</span>
          <v-icon color="primary" size="small">mdi-arrow-right</v-icon>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBlogStore } from '@/stores/blog'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'BlogsAndReviews',

  data() {
    return {
      router: useRouter(),
      blogStore: useBlogStore(),
    }
  },

  mounted() {
    this.blogStore.fetchPosts()
  },
})
</script>

<style scoped>
.blogs-section {
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

.blogs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.blog-card {
  background: var(--v-surface-base);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.blog-info {
  flex: 1;
}

.blog-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.4;
  color: var(--v-primary-base);
  transition: color 0.2s ease;
}

.blog-author {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 6px;
}

.blog-content {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.blog-date {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.review-rating {
  background: var(--v-primary-base);
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  margin-left: 16px;
}

@media (max-width: 768px) {
  .blogs-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .section-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .blog-card {
    padding: 20px;
  }

  .blog-title {
    font-size: 16px;
  }
}
</style>
