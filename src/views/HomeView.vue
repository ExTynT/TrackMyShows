<script setup lang="ts">
import { useMediaStore } from '@/stores/mediaStore'
import { useStatsStore } from '@/stores/statsStore'
import { useNewsStore } from '@/stores/newsStore'
import { ref, onMounted, computed } from 'vue'
import TrendingCard from '@/components/TrendingCard.vue'
import AnimeCard from '@/components/AnimeCard.vue'
import MangaCard from '@/components/MangaCard.vue'
import StatsCard from '@/components/StatsCard.vue'
import NewsCard from '@/components/NewsCard.vue'

const store = useMediaStore()
const statsStore = useStatsStore()
const newsStore = useNewsStore()

const selectedContentType = ref<'anime' | 'manga'>('anime')
const selectedSeason = ref('Winter 2024')

const stats = computed(() => [
  { title: 'Currently Watching', value: statsStore.currentlyWatching.toString(), icon: 'eye' },
  { title: 'Episodes Watched', value: statsStore.episodesWatched.toString(), icon: 'tv' },
  { title: 'Hours Watched', value: statsStore.hoursWatched.toString(), icon: 'clock' },
  { title: 'Mean Score', value: statsStore.meanScore.toString(), icon: 'star' },
])

onMounted(() => {
  store.initializeStore()
  newsStore.initializeNews()
  console.log('News:', newsStore.news)
})

const trendingContent = computed(() => store.getTrendingMedia(selectedContentType.value))
const popularContent = computed(() => store.getPopularMedia(selectedContentType.value))
const seasonalAnime = computed(() => {
  const animeForSeason = store.getSeasonalAnime(selectedSeason.value)
  return animeForSeason.slice(0, 4)
})
</script>

<template>
  <main>
    <!-- Trending Section -->
    <section class="trending">
      <div class="section-header">
        <h2>Trending Now</h2>
        <div class="content-type-toggle">
          <button
            :class="{ active: selectedContentType === 'anime' }"
            @click="selectedContentType = 'anime'"
          >
            Anime
          </button>
          <button
            :class="{ active: selectedContentType === 'manga' }"
            @click="selectedContentType = 'manga'"
          >
            Manga
          </button>
        </div>
      </div>
      <div class="trending-grid">
        <TrendingCard
          v-for="item in trendingContent"
          :key="item.id"
          :media="item"
          :rank="item.weeklyRank"
          :views="item.weeklyViews"
          :mediaType="selectedContentType"
        />
      </div>
    </section>

    <!-- Popular Section -->
    <section class="popular">
      <div class="section-header">
        <h2>Popular</h2>
        <div class="content-type-toggle">
          <button
            :class="{ active: selectedContentType === 'anime' }"
            @click="selectedContentType = 'anime'"
          >
            Anime
          </button>
          <button
            :class="{ active: selectedContentType === 'manga' }"
            @click="selectedContentType = 'manga'"
          >
            Manga
          </button>
        </div>
      </div>
      <div class="content-grid">
        <template v-if="selectedContentType === 'anime'">
          <AnimeCard v-for="anime in popularContent" :key="anime.id" :anime="anime" />
        </template>
        <template v-else>
          <MangaCard v-for="manga in popularContent" :key="manga.id" :manga="manga" />
        </template>
      </div>
    </section>

    <!-- Seasonal Anime Section -->
    <section class="seasonal">
      <div class="section-header">
        <h2>Seasonal Anime</h2>
        <div class="season-toggle">
          <button
            :class="{ active: selectedSeason === 'Winter 2024' }"
            @click="selectedSeason = 'Winter 2024'"
          >
            Winter 2024
          </button>
          <button
            :class="{ active: selectedSeason === 'Fall 2023' }"
            @click="selectedSeason = 'Fall 2023'"
          >
            Fall 2023
          </button>
          <button
            :class="{ active: selectedSeason === 'Summer 2023' }"
            @click="selectedSeason = 'Summer 2023'"
          >
            Summer 2023
          </button>
        </div>
      </div>
      <div class="content-grid">
        <AnimeCard v-for="anime in seasonalAnime" :key="anime.id" :anime="anime" />
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <h2>Statistics</h2>
      <div class="stats-grid">
        <StatsCard
          v-for="stat in stats"
          :key="stat.title"
          :count="Number(stat.value.replace(',', ''))"
          :label="stat.title"
        />
      </div>
    </section>

    <!-- News Section -->
    <section class="news">
      <h2>Latest News</h2>
      <div class="news-grid">
        <NewsCard v-for="item in newsStore.news" :key="item.id" :news="item" />
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

section {
  margin-bottom: 3rem;
  background: var(--card-background);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin: 0;
}

.content-type-toggle,
.season-toggle {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background: var(--card-background);
  color: var(--text-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.trending-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stats {
  margin-bottom: 3rem;
}

.stats h2 {
  margin-bottom: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem;
}

.news {
  margin-bottom: 3rem;
}

.news h2 {
  margin-bottom: 1.5rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  main {
    padding: 1rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
  }

  .content-type-toggle,
  .season-toggle {
    width: 100%;
  }

  button {
    flex: 1;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
