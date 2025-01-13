<script lang="ts">
import { useRouter } from 'vue-router'

interface TrendingMedia {
  id: number
  title: string
  image: string
  score: number
  type: string
  episodes?: number
  chapters?: number
  year: number
  status: string
  genres: string[]
  weeklyViews: number
  monthlyViews: number
  weeklyRank: number
  monthlyRank: number
}

export default {
  name: 'TrendingCard',
  props: {
    media: {
      type: Object as () => TrendingMedia,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    mediaType: {
      type: String as () => 'anime' | 'manga',
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()

    const goToDetail = () => {
      router.push({ name: 'media-detail', params: { type: props.mediaType, id: props.media.id } })
    }

    return {
      goToDetail,
    }
  },
  computed: {
    formattedViews() {
      return this.views >= 1000000
        ? `${(this.views / 1000000).toFixed(1)}M`
        : this.views >= 1000
          ? `${(this.views / 1000).toFixed(0)}K`
          : this.views.toString()
    },
  },
}
</script>

<template>
  <div class="trending-card" @click="goToDetail">
    <div class="rank">#{{ rank }}</div>
    <div class="card-content">
      <img :src="media.image" :alt="media.title" class="anime-image" />
      <div class="info">
        <h4 class="title">{{ media.title }}</h4>
        <div class="stats">
          <span class="views">{{ formattedViews }} views</span>
          <span class="score">★ {{ media.score.toFixed(1) }}</span>
        </div>
        <div class="info-details">
          <span class="type">{{ media.type }}</span>
          <span v-if="mediaType === 'anime' && media.episodes" class="count"
            >{{ media.episodes }} eps</span
          >
          <span v-if="mediaType === 'manga' && media.chapters" class="count"
            >{{ media.chapters }} ch</span
          >
        </div>
        <div class="genres">
          <span v-for="genre in media.genres.slice(0, 2)" :key="genre" class="genre">{{
            genre
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trending-card {
  background-color: var(--card-background);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.trending-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.rank {
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-weight: 700;
  z-index: 1;
  backdrop-filter: blur(4px);
  font-size: 0.95rem;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.anime-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.trending-card:hover .anime-image {
  transform: scale(1.08);
}

.info {
  padding: 1.2rem;
}

.title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: var(--text-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  color: var(--text-color-secondary);
  font-size: 0.95rem;
  font-weight: 500;
}

.score {
  color: #ffd700;
  font-weight: 700;
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

.info-details {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
}

.type,
.count {
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

.type:hover,
.count:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-1px);
}
</style>
