<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'MangaCard',
  props: {
    manga: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()

    const goToDetail = () => {
      router.push({ name: 'media-detail', params: { type: 'manga', id: props.manga.id } })
    }

    return {
      goToDetail,
    }
  },
}
</script>

<template>
  <div class="manga-card" @click="goToDetail">
    <div class="card-image">
      <img :src="manga.image" :alt="manga.title" />
      <div class="overlay">
        <div class="score">
          <i class="fas fa-star"></i>
          {{ manga.score.toFixed(1) }}
        </div>
        <div class="info">
          <span class="type">{{ manga.type }}</span>
          <span v-if="manga.chapters" class="chapters">{{ manga.chapters }} ch</span>
        </div>
      </div>
    </div>
    <div class="card-content">
      <h3 class="title">{{ manga.title }}</h3>
      <div class="author">{{ manga.author }}</div>
      <div class="genres">
        <span v-for="genre in manga.genres.slice(0, 2)" :key="genre" class="genre">
          {{ genre }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.manga-card {
  background: var(--card-background);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid var(--border-color);
  height: 100%;
  position: relative;
}

.manga-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.manga-card:hover .card-image img {
  transform: scale(1.08);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.2rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.score {
  background: rgba(0, 0, 0, 0.75);
  color: #ffd700;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  backdrop-filter: blur(4px);
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
}

.type,
.chapters {
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  backdrop-filter: blur(4px);
  letter-spacing: 0.02em;
}

.card-content {
  padding: 1.2rem;
}

.title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.8rem 0;
  color: var(--text-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.author {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  font-weight: 500;
  opacity: 0.9;
}

.genres {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: auto;
}

.genre {
  color: var(--text-color-secondary);
  font-size: 0.8rem;
  padding: 0.25rem 0.7rem;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.genre:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-1px);
}
</style>
