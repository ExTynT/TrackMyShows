<script lang="ts">
import type { NewsItem } from '@/stores/newsStore'
import { useNewsStore } from '@/stores/newsStore'

export default {
  name: 'NewsCard',
  props: {
    news: {
      type: Object as () => NewsItem,
      required: true,
    },
  },
  setup(props) {
    const store = useNewsStore()

    const handleLike = () => {
      store.likeNews(props.news.id)
    }

    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date)
    }

    return {
      handleLike,
      formatDate,
    }
  },
}
</script>

<template>
  <article class="news-card">
    <div class="news-image" v-if="news.image">
      <img :src="news.image" :alt="news.title" />
      <div class="category-badge" :class="news.category.toLowerCase()">
        {{ news.category }}
      </div>
    </div>
    <div class="news-content">
      <h3 class="news-title">{{ news.title }}</h3>
      <p class="news-excerpt">{{ news.excerpt }}</p>
      <div class="news-footer">
        <time :datetime="news.date" class="news-date">
          {{ formatDate(news.date) }}
        </time>
        <button class="like-button" @click="handleLike" :class="{ liked: news.likes > 0 }">
          <i class="fas fa-heart"></i>
          {{ news.likes.toLocaleString() }}
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.news-card {
  background: var(--card-background);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.news-image {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.news-card:hover .news-image img {
  transform: scale(1.08);
}

.category-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(4px);
}

.category-badge.anime {
  background: rgba(46, 81, 162, 0.9);
}

.category-badge.manga {
  background: rgba(229, 62, 62, 0.9);
}

.category-badge.industry {
  background: rgba(72, 187, 120, 0.9);
}

.news-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--text-color);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-excerpt {
  color: var(--text-color-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.news-date {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: var(--background-color);
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.like-button:hover,
.like-button.liked {
  background: #ff4757;
  color: white;
  border-color: #ff4757;
}

.like-button i {
  font-size: 0.9rem;
  transition: transform 0.2s ease;
}

.like-button:hover i {
  transform: scale(1.2);
}
</style>
