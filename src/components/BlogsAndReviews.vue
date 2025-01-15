<template>
  <section class="blogs-section">
    <h2 class="section-title">Blogs and Reviews</h2>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="loader"
    ></v-progress-circular>
    <div v-else class="blogs-grid">
      <v-card
        v-for="blog in blogs"
        :key="blog.id"
        class="blog-card"
        :to="{ name: 'blog-detail', params: { id: blog.id } }"
        elevation="0"
      >
        <div class="blog-header">
          <div class="blog-info">
            <h3 class="blog-title">{{ blog.title }}</h3>
            <p class="blog-author">{{ blog.author }}</p>
          </div>
        </div>
        <p class="blog-content">{{ blog.content }}</p>
        <div class="blog-footer">
          <span class="blog-date">{{ formatDate(blog.date) }}</span>
          <v-icon color="primary" size="small">mdi-arrow-right</v-icon>
        </div>
      </v-card>

      <v-card
        v-for="review in reviews"
        :key="review.id"
        class="blog-card review-card"
        :to="{ name: 'blog-detail', params: { id: review.id } }"
        elevation="0"
      >
        <div class="blog-header">
          <div class="blog-info">
            <h3 class="blog-title">{{ review.title }}</h3>
            <p class="blog-author">{{ review.author }}</p>
          </div>
          <div v-if="review.rating !== undefined" class="review-rating">{{ review.rating }}/10</div>
        </div>
        <p class="blog-content">{{ review.content }}</p>
        <div class="blog-footer">
          <span class="blog-date">{{ formatDate(review.date) }}</span>
          <v-icon color="primary" size="small">mdi-arrow-right</v-icon>
        </div>
      </v-card>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBlogStore } from '@/stores/blog'
import type { Blog } from '@/types/blog'

export default defineComponent({
  name: 'BlogsAndReviews',

  data() {
    const store = useBlogStore()
    return {
      blogStore: store,
      blogs: [] as Blog[],
      reviews: [] as Blog[],
      loading: true,
    }
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
        await this.blogStore.fetchPosts()
        this.blogs = this.blogStore.blogs
        this.reviews = this.blogStore.reviews
      } catch (error) {
        console.error('Error fetching posts:', error)
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
  padding: 28px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.blog-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
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
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.4;
  color: var(--v-primary-base);
  letter-spacing: -0.5px;
}

.blog-author {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.blog-author::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: var(--v-primary-base);
  border-radius: 50%;
}

.blog-content {
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

.blog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.blog-date {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.review-rating {
  background: var(--v-primary-base);
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  margin-left: 16px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(var(--v-primary-base), 0.3);
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
