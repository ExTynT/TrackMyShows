<script setup lang="ts">
import { ref } from 'vue'

interface AnimeShow {
  id: number
  title: string
  image: string
  score: number
  type: string
  episodes: number
  year: number
  status: string
  genres: string[]
  synopsis: string
  studios: string[]
  season: string
  duration: string
  rating: string
}

const seasonalAnime: AnimeShow[] = [
  {
    id: 1,
    title: 'Jujutsu Kaisen Season 2',
    image: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
    score: 9.2,
    type: 'TV',
    episodes: 23,
    year: 2023,
    status: 'Currently Airing',
    genres: ['Action', 'Fantasy', 'School', 'Supernatural'],
    synopsis: 'Second season of Jujutsu Kaisen.',
    studios: ['MAPPA'],
    season: 'Fall 2023',
    duration: '23 min per ep',
    rating: 'R - 17+',
  },
  {
    id: 2,
    title: "Frieren: Beyond Journey's End",
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    score: 8.9,
    type: 'TV',
    episodes: 28,
    year: 2023,
    status: 'Currently Airing',
    genres: ['Adventure', 'Drama', 'Fantasy'],
    synopsis:
      'After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. The mage Frieren, who joined them on their journey, is the last surviving member of the group.',
    studios: ['Madhouse'],
    season: 'Fall 2023',
    duration: '23 min per ep',
    rating: 'PG-13',
  },
]

const topAnime: AnimeShow[] = [
  {
    id: 3,
    title: 'Fullmetal Alchemist: Brotherhood',
    image: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
    score: 9.1,
    type: 'TV',
    episodes: 64,
    year: 2009,
    status: 'Finished Airing',
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
    synopsis:
      "After a terrible incident involving a failed alchemical ritual, brothers Edward and Alphonse Elric start searching for the Philosopher's Stone.",
    studios: ['Bones'],
    season: 'Spring 2009',
    duration: '24 min per ep',
    rating: 'R - 17+',
  },
  {
    id: 8,
    title: 'Steins;Gate',
    image: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg',
    score: 9.0,
    type: 'TV',
    episodes: 24,
    year: 2011,
    status: 'Finished Airing',
    genres: ['Drama', 'Sci-Fi', 'Suspense'],
    synopsis:
      'A self-proclaimed mad scientist discovers a way to alter the past through text messages, leading to dire consequences.',
    studios: ['White Fox'],
    season: 'Spring 2011',
    duration: '24 min per ep',
    rating: 'PG-13',
  },
  {
    id: 9,
    title: 'Attack on Titan: The Final Season',
    image: 'https://cdn.myanimelist.net/images/anime/1948/120625.jpg',
    score: 9.0,
    type: 'TV',
    episodes: 16,
    year: 2023,
    status: 'Finished Airing',
    genres: ['Action', 'Drama', 'Suspense'],
    synopsis: "The epic conclusion to humanity's fight for survival.",
    studios: ['MAPPA'],
    season: 'Fall 2023',
    duration: '23 min per ep',
    rating: 'R - 17+',
  },
]

const genres = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller',
]

const seasons = ['Winter 2024', 'Fall 2023', 'Summer 2023', 'Spring 2023']
const types = ['TV', 'Movie', 'OVA', 'Special', 'ONA']
const status = ['Currently Airing', 'Finished Airing', 'Not Yet Aired']

const showFilters = ref(false)
const selectedGenres = ref<string[]>([])
const watchingCount = ref(0)

const trendingNow = [
  {
    id: 1,
    title: 'Solo Leveling',
    image: 'https://cdn.myanimelist.net/images/anime/1926/140799.jpg',
    trend: '+254%',
    weeklyViews: '1.2M',
    genres: ['Action', 'Adventure', 'Fantasy'],
    score: 8.9,
  },
  {
    id: 2,
    title: 'Mashle',
    image: 'https://cdn.myanimelist.net/images/anime/1218/135107.jpg',
    trend: '+186%',
    weeklyViews: '856K',
    genres: ['Action', 'Comedy', 'Fantasy'],
    score: 8.2,
  },
  {
    id: 3,
    title: 'Spy x Family Season 2',
    image: 'https://cdn.myanimelist.net/images/anime/1506/138982.jpg',
    trend: '+165%',
    weeklyViews: '723K',
    genres: ['Action', 'Comedy', 'Slice of Life'],
    score: 8.7,
  },
  {
    id: 4,
    title: 'Dungeon Meshi',
    image: 'https://cdn.myanimelist.net/images/anime/1981/126812.jpg',
    trend: '+142%',
    weeklyViews: '512K',
    genres: ['Action', 'Adventure', 'Fantasy'],
    score: 8.1,
  },
]

const upcomingPremiers = [
  {
    id: 10,
    title: 'Classroom of the Elite Season 3',
    image: 'https://cdn.myanimelist.net/images/anime/1332/139318.jpg',
    premiereDate: '2024-01-03',
    daysLeft: 5,
  },
  {
    id: 11,
    title: 'One Piece',
    image: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
    premiereDate: '2024-01-07',
    daysLeft: 9,
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    score: 8.71,
    synopsis:
      'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world...',
    studios: ['Toei Animation'],
    type: 'TV',
    episodes: 1089,
  },
  {
    id: 12,
    title: 'Tsukimichi: Moonlit Fantasy Season 2',
    image: 'https://cdn.myanimelist.net/images/anime/1752/139314.jpg',
    premiereDate: '2024-01-08',
    daysLeft: 10,
  },
]

const toggleGenre = (genre: string) => {
  const index = selectedGenres.value.indexOf(genre)
  if (index === -1) {
    selectedGenres.value.push(genre)
  } else {
    selectedGenres.value.splice(index, 1)
  }
}

const startWatching = () => {
  watchingCount.value++
}
</script>

<template>
  <div class="anime-page">
    <section class="search-section">
      <div class="search-bar">
        <input type="text" placeholder="Search anime..." class="search-input" />
        <button class="search-btn">Search</button>
        <button class="filter-toggle" @click="showFilters = !showFilters">
          <i class="fas" :class="showFilters ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
          Filters
        </button>
      </div>

      <div class="filters-section" v-show="showFilters" :class="{ show: showFilters }">
        <div class="filters">
          <div class="filter-group">
            <h4>Season</h4>
            <select class="filter-select">
              <option v-for="season in seasons" :key="season" :value="season">
                {{ season }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <h4>Type</h4>
            <select class="filter-select">
              <option v-for="type in types" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <h4>Status</h4>
            <select class="filter-select">
              <option v-for="s in status" :key="s" :value="s">
                {{ s }}
              </option>
            </select>
          </div>
        </div>

        <div class="genres-filter">
          <h4>Genres</h4>
          <div class="genres-grid">
            <button
              v-for="genre in genres"
              :key="genre"
              class="genre-btn"
              @click="toggleGenre(genre)"
            >
              {{ genre }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <div class="content-grid">
      <div class="main-column">
        <section class="trending-section">
          <div class="section-header">
            <h3>Trending Now</h3>
            <div class="trend-period">
              <button class="period-btn active">Today</button>
              <button class="period-btn">This Week</button>
              <button class="period-btn">This Season</button>
            </div>
          </div>

          <div class="trending-grid">
            <router-link
              v-for="anime in trendingNow"
              :key="anime.id"
              :to="`/anime/${anime.id}`"
              class="trending-card"
            >
              <div class="trend-indicator">
                <i class="fas fa-arrow-up"></i>
                {{ anime.trend }}
              </div>
              <div class="anime-image-container">
                <img :src="anime.image" :alt="anime.title" class="anime-image" />
                <div class="anime-overlay">
                  <div class="anime-quick-info">
                    <span class="anime-score"><i class="fas fa-star"></i> {{ anime.score }}</span>
                    <span class="views-badge">
                      <i class="fas fa-eye"></i>
                      {{ anime.weeklyViews }}
                    </span>
                  </div>
                  <div class="anime-genres">
                    <span v-for="genre in anime.genres" :key="genre" class="genre-tag">
                      {{ genre }}
                    </span>
                  </div>
                </div>
              </div>
              <h4 class="anime-title">{{ anime.title }}</h4>
            </router-link>
          </div>
        </section>

        <section class="seasonal-section">
          <div class="section-header">
            <h3>Seasonal Anime</h3>
            <div class="season-nav">
              <button class="season-btn active">Winter 2024</button>
              <button class="season-btn">Fall 2023</button>
              <button class="season-btn">Summer 2023</button>
            </div>
          </div>

          <div class="anime-grid">
            <div v-for="anime in seasonalAnime" :key="anime.id" class="anime-card">
              <div class="anime-image-container">
                <img :src="anime.image" :alt="anime.title" class="anime-image" />
                <div class="anime-overlay">
                  <div class="anime-quick-info">
                    <span class="anime-type">{{ anime.type }}</span>
                    <span class="anime-episodes">{{ anime.episodes }} eps</span>
                  </div>
                  <div class="anime-genres">
                    <span v-for="genre in anime.genres.slice(0, 2)" :key="genre" class="genre-tag">
                      {{ genre }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="anime-info">
                <h4 class="anime-title">{{ anime.title }}</h4>
                <div class="anime-meta">
                  <span class="anime-score"> <i class="fas fa-star"></i> {{ anime.score }} </span>
                  <span class="anime-studio">{{ anime.studios[0] }}</span>
                </div>
                <p class="anime-synopsis">{{ anime.synopsis }}</p>
                <div class="anime-details">
                  <span class="detail-item">
                    <i class="fas fa-clock"></i> {{ anime.duration }}
                  </span>
                  <span class="detail-item">
                    <i class="fas fa-calendar"></i> {{ anime.season }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="top-anime-section">
          <div class="section-header">
            <h3>Top Anime</h3>
            <a href="#" class="view-all">View Rankings</a>
          </div>

          <div class="top-anime-list">
            <div v-for="anime in topAnime" :key="anime.id" class="top-anime-item">
              <div class="rank">#{{ anime.id }}</div>
              <div class="anime-image-container">
                <img :src="anime.image" :alt="anime.title" class="anime-image" />
              </div>
              <div class="anime-info">
                <h4 class="anime-title">{{ anime.title }}</h4>
                <div class="anime-meta">
                  <span class="anime-score"> <i class="fas fa-star"></i> {{ anime.score }} </span>
                  <span class="anime-type">{{ anime.type }}</span>
                </div>
                <div class="anime-genres">
                  <span v-for="genre in anime.genres.slice(0, 3)" :key="genre" class="genre-tag">
                    {{ genre }}
                  </span>
                </div>
              </div>
              <button class="add-list-btn" @click="startWatching">+ Add to List</button>
            </div>
          </div>
        </section>

        <section class="premiers-section">
          <div class="section-header">
            <h3>Upcoming Premiers</h3>
            <div class="calendar-toggle">
              <i class="fas fa-calendar"></i>
              View Calendar
            </div>
          </div>

          <div class="premiers-grid">
            <div v-for="anime in upcomingPremiers" :key="anime.id" class="premier-card">
              <div class="countdown-badge" :class="{ soon: anime.daysLeft <= 7 }">
                {{ anime.daysLeft }} days left
              </div>
              <div class="anime-image-container">
                <img :src="anime.image" :alt="anime.title" class="anime-image" />
              </div>
              <div class="premier-info">
                <h4 class="anime-title">{{ anime.title }}</h4>
                <div class="premier-date">
                  <i class="fas fa-calendar-day"></i>
                  {{ anime.premiereDate }}
                </div>
                <button class="notify-btn">
                  <i class="fas fa-bell"></i>
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside class="side-column">
        <section class="watch-stats">
          <h3>Your Watch Stats</h3>
          <div class="stats-content">
            <div class="watch-progress">
              <div class="progress-circle">
                <span class="progress-number">{{ watchingCount }}</span>
                <span class="progress-label">Watching</span>
              </div>
            </div>
            <div class="stats-actions">
              <button class="action-btn">
                <i class="fas fa-history"></i>
                History
              </button>
              <button class="action-btn">
                <i class="fas fa-chart-line"></i>
                Analytics
              </button>
            </div>
          </div>
        </section>

        <section class="advanced-search">
          <h3>Advanced Search</h3>
          <div class="search-options">
            <div class="option-group">
              <label>Rating</label>
              <select class="filter-select">
                <option>All Ratings</option>
                <option>G - All Ages</option>
                <option>PG - Children</option>
                <option>PG-13</option>
                <option>R - 17+</option>
              </select>
            </div>
            <div class="option-group">
              <label>Studios</label>
              <select class="filter-select">
                <option>All Studios</option>
                <option>MAPPA</option>
                <option>Madhouse</option>
                <option>Bones</option>
              </select>
            </div>
            <div class="option-group">
              <label>Sort By</label>
              <select class="filter-select">
                <option>Score</option>
                <option>Popularity</option>
                <option>Latest</option>
              </select>
            </div>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.anime-page {
  width: 100%;
  padding: 2rem 1rem;
}

.search-section {
  background: var(--card-background);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  color: var(--text-color);
}

.search-btn {
  padding: 0.8rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: var(--link-hover-color);
}

.filter-toggle {
  padding: 0.8rem 1.5rem;
  background: var(--card-background);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.filter-toggle:hover {
  background: var(--primary-color);
  color: white;
}

.filters-section {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  opacity: 0;
}

.filters-section.show {
  max-height: 500px;
  opacity: 1;
  margin-top: 1rem;
}

.trending-section {
  margin-bottom: 3rem;
}

.trend-period {
  display: flex;
  gap: 0.5rem;
}

.period-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: var(--card-background);
  color: var(--text-color-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.period-btn.active {
  background: var(--primary-color);
  color: white;
}

.trending-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.trending-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;
}

.trending-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-color);
}

.trending-card .anime-image-container {
  height: 280px;
  display: block;
  position: relative;
  text-decoration: none;
  color: inherit;
}

.trending-card .anime-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.trending-card .anime-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.trending-card:hover .anime-overlay {
  opacity: 1;
}

.trending-card .anime-title {
  padding: 1rem;
  margin: 0;
  text-align: center;
  font-weight: 600;
}

.trending-card .anime-score {
  color: #ffd700;
  font-weight: bold;
  font-size: 1.1rem;
}

.trending-card .anime-genres {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.premiers-section {
  margin-top: 3rem;
}

.calendar-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 500;
}

.premier-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.countdown-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--card-background);
  color: var(--text-color);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 1;
}

.countdown-badge.soon {
  background: #ff4757;
  color: white;
}

.premier-info {
  padding: 1rem;
}

.premier-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.notify-btn {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.notify-btn:hover {
  background: var(--link-hover-color);
}

.watch-stats {
  background: var(--card-background);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
}

.watch-progress {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.progress-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--background-color);
  border: 4px solid var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.progress-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
}

.progress-label {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}

.stats-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.action-btn {
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--background-color);
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: var(--primary-color);
  color: white;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h3 {
  font-size: 1.8rem;
  color: var(--text-color);
  font-weight: bold;
}

.season-nav {
  display: flex;
  gap: 1rem;
}

.season-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: var(--card-background);
  color: var(--text-color-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.season-btn.active,
.season-btn:hover {
  background: var(--primary-color);
  color: white;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.anime-card {
  background: var(--card-background);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.anime-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.anime-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.anime-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.anime-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.anime-card:hover .anime-overlay {
  opacity: 1;
}

.anime-quick-info {
  display: flex;
  justify-content: space-between;
  color: white;
}

.anime-info {
  padding: 1.2rem;
}

.anime-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.anime-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.anime-score {
  color: #ffa41c;
  font-weight: bold;
}

.anime-studio {
  color: var(--text-color-secondary);
}

.anime-synopsis {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.anime-details {
  display: flex;
  gap: 1rem;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.genre-tag {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.top-anime-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.top-anime-item {
  display: grid;
  grid-template-columns: auto 100px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--card-background);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.top-anime-item:hover {
  transform: translateX(4px);
  border-color: var(--primary-color);
}

.advanced-search {
  background: var(--card-background);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.search-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option-group label {
  color: var(--text-color);
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .anime-grid {
    grid-template-columns: 1fr;
  }

  .top-anime-item {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'rank image'
      'info info'
      'button button';
  }

  .trending-grid {
    grid-template-columns: 1fr;
  }

  .stats-actions {
    grid-template-columns: 1fr;
  }
}
</style>
