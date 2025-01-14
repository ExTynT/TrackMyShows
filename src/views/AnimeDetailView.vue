<template>
  <div v-if="loading" class="d-flex justify-center align-center" style="min-height: 400px">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else-if="animeStore.currentAnime" class="anime-detail">
    <!-- Hero Section -->
    <v-carousel
      cycle
      height="600"
      hide-delimiter-background
      show-arrows="hover"
      class="hero-carousel"
    >
      <v-carousel-item>
        <v-img :src="animeStore.currentAnime.cover_image_url" height="600" cover>
          <div class="hero-overlay">
            <v-container>
              <v-row>
                <v-col cols="12" md="3">
                  <v-img
                    :src="animeStore.currentAnime.image_url"
                    height="400"
                    class="poster-image"
                    cover
                  ></v-img>
                </v-col>
                <v-col cols="12" md="9" class="d-flex flex-column justify-center">
                  <h1 class="text-h2 font-weight-bold text-white mb-4">
                    {{ animeStore.currentAnime.title }}
                  </h1>
                  <p class="text-h6 text-white mb-4" v-if="animeStore.currentAnime.japanese_title">
                    {{ animeStore.currentAnime.japanese_title }}
                  </p>
                  <div class="d-flex align-center mb-6">
                    <v-rating
                      v-model="animeStore.currentAnime.rating"
                      color="amber"
                      half-increments
                      readonly
                      size="small"
                    ></v-rating>
                    <span class="text-white ms-2">{{ animeStore.currentAnime.rating }}/5</span>
                  </div>
                  <p class="text-white text-body-1">{{ animeStore.currentAnime.synopsis }}</p>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-img>
      </v-carousel-item>

      <v-carousel-item>
        <v-img :src="animeStore.currentAnime.cover_image_url" height="600" cover>
          <div class="hero-overlay">
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-column justify-center text-center">
                  <h2 class="text-h3 font-weight-bold text-white mb-6">Studio Spotlight</h2>
                  <div class="d-flex justify-center flex-wrap gap-4 mb-6">
                    <v-chip
                      v-for="studio in animeStore.currentAnime.studios"
                      :key="studio.studios.id"
                      size="x-large"
                      class="pa-4"
                      color="primary"
                    >
                      <v-img
                        :src="studio.studios.logo_url"
                        height="24"
                        width="48"
                        class="me-2"
                        contain
                      ></v-img>
                      {{ studio.studios.name }}
                    </v-chip>
                  </div>
                  <div class="d-flex justify-center flex-wrap gap-2">
                    <v-chip
                      v-for="genreRelation in animeStore.currentAnime.genres"
                      :key="genreRelation.genres.id"
                      variant="outlined"
                      class="ma-1"
                    >
                      {{ genreRelation.genres.name }}
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-img>
      </v-carousel-item>

      <v-carousel-item>
        <v-img :src="animeStore.currentAnime.cover_image_url" height="600" cover>
          <div class="hero-overlay">
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-column justify-center text-center">
                  <h2 class="text-h3 font-weight-bold text-white mb-6">Quick Stats</h2>
                  <v-row justify="center">
                    <v-col cols="12" sm="4">
                      <div class="stat-card pa-4 rounded-lg">
                        <v-icon size="48" color="primary" class="mb-2"
                          >mdi-television-classic</v-icon
                        >
                        <h3 class="text-h4 font-weight-bold mb-2">
                          {{ animeStore.currentAnime.episodes || '?' }}
                        </h3>
                        <p class="text-body-1">Episodes</p>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="stat-card pa-4 rounded-lg">
                        <v-icon size="48" color="primary" class="mb-2">mdi-star</v-icon>
                        <h3 class="text-h4 font-weight-bold mb-2">
                          {{ animeStore.currentAnime.rating }}/5
                        </h3>
                        <p class="text-body-1">Rating</p>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="stat-card pa-4 rounded-lg">
                        <v-icon size="48" color="primary" class="mb-2">mdi-calendar</v-icon>
                        <h3 class="text-h4 font-weight-bold mb-2 text-capitalize">
                          {{ animeStore.currentAnime.season }}
                        </h3>
                        <p class="text-body-1">{{ animeStore.currentAnime.year }}</p>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-img>
      </v-carousel-item>
    </v-carousel>

    <v-container class="py-8">
      <v-row>
        <!-- Main Content -->
        <v-col cols="12" md="8">
          <!-- Details Card -->
          <v-card class="mb-6" elevation="2">
            <v-card-title class="text-h5 py-4 px-6 bg-primary text-white">Details</v-card-title>
            <v-card-text class="pa-6">
              <v-row>
                <v-col cols="4" class="text-grey text-subtitle-1">Status</v-col>
                <v-col cols="8" class="text-subtitle-1">
                  <v-chip :color="getStatusColor(animeStore.currentAnime.status)" label>
                    {{ animeStore.currentAnime.status }}
                  </v-chip>
                </v-col>

                <v-col cols="4" class="text-grey text-subtitle-1">Episodes</v-col>
                <v-col cols="8" class="text-subtitle-1">
                  {{ animeStore.currentAnime.episodes || 'Unknown' }}
                </v-col>

                <v-col cols="4" class="text-grey text-subtitle-1">Season</v-col>
                <v-col cols="8" class="text-subtitle-1 text-capitalize">
                  {{ animeStore.currentAnime.season }} {{ animeStore.currentAnime.year }}
                </v-col>

                <v-col cols="4" class="text-grey text-subtitle-1">Studios</v-col>
                <v-col cols="8">
                  <v-chip
                    v-for="studio in animeStore.currentAnime.studios"
                    :key="studio.studios.id"
                    class="mr-2 mb-2"
                    color="primary"
                    variant="outlined"
                  >
                    <v-img
                      :src="studio.studios.logo_url"
                      height="16"
                      width="32"
                      class="me-1"
                      contain
                    ></v-img>
                    {{ studio.studios.name }}
                  </v-chip>
                </v-col>

                <v-col cols="4" class="text-grey text-subtitle-1">Genres</v-col>
                <v-col cols="8">
                  <v-chip
                    v-for="genreRelation in animeStore.currentAnime.genres"
                    :key="genreRelation.genres.id"
                    class="mr-2 mb-2"
                    variant="outlined"
                  >
                    {{ genreRelation.genres.name }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Characters -->
          <v-card class="mb-6" elevation="2">
            <v-card-title class="text-h5 py-4 px-6 bg-primary text-white">Characters</v-card-title>
            <v-card-text class="pa-6">
              <v-row>
                <v-col
                  v-for="character in animeStore.currentAnime.characters"
                  :key="character.id"
                  cols="12"
                  sm="6"
                  md="4"
                  class="d-flex"
                >
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card
                      :elevation="isHovering ? 8 : 2"
                      :class="{ 'on-hover': isHovering }"
                      v-bind="props"
                      variant="outlined"
                      class="character-card d-flex flex-column"
                      width="100%"
                    >
                      <div class="character-icon-container pa-8 d-flex justify-center align-center">
                        <v-icon size="96" color="primary" class="character-icon">
                          {{ getCharacterIcon(character.name) }}
                        </v-icon>
                      </div>
                      <v-card-text class="flex-grow-1 d-flex flex-column">
                        <div>
                          <h3 class="text-h6 mb-2">{{ character.name }}</h3>
                          <p v-if="character.japanese_name" class="text-grey mb-2">
                            {{ character.japanese_name }}
                          </p>
                        </div>
                        <p class="text-body-2 mt-auto">{{ character.description }}</p>
                      </v-card-text>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Sidebar -->
        <v-col cols="12" md="4">
          <!-- User Progress -->
          <v-card class="mb-6" elevation="2">
            <v-card-title class="text-h5 py-4 px-6 bg-primary text-white"
              >Your Progress</v-card-title
            >
            <v-card-text class="pa-6">
              <v-select
                v-model="userStatus"
                :items="['watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch']"
                label="Status"
                class="mb-4"
              ></v-select>
              <v-text-field
                v-model="episodesWatched"
                type="number"
                :max="animeStore.currentAnime.episodes"
                min="0"
                label="Episodes Watched"
                class="mb-4"
              ></v-text-field>
              <v-btn
                block
                color="primary"
                :loading="updating"
                @click="updateProgress"
                class="text-capitalize"
              >
                Update Progress
              </v-btn>
            </v-card-text>
          </v-card>

          <!-- Similar Anime -->
          <v-card elevation="2">
            <v-card-title class="text-h5 py-4 px-6 bg-primary text-white"
              >Similar Anime</v-card-title
            >
            <v-card-text class="pa-6">
              <v-list>
                <v-list-item
                  v-for="anime in similarAnime"
                  :key="anime.id"
                  :to="'/anime/' + anime.id"
                  class="mb-2"
                >
                  <template v-slot:prepend>
                    <v-avatar size="48">
                      <v-img :src="anime.image_url" cover></v-img>
                    </v-avatar>
                  </template>
                  <v-list-item-title>{{ anime.title }}</v-list-item-title>
                  <v-list-item-subtitle class="d-flex align-center">
                    <v-rating
                      v-model="anime.rating"
                      color="amber"
                      density="compact"
                      half-increments
                      readonly
                      size="x-small"
                    ></v-rating>
                    <span class="ms-2 text-grey">{{ anime.rating }}/5</span>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else class="d-flex justify-center align-center" style="min-height: 400px">
    <div class="text-center">
      <v-icon size="64" color="grey" class="mb-4">mdi-alert</v-icon>
      <h3 class="text-h5 text-grey-darken-1">Anime not found</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAnimeStore } from '@/stores/animeStore'
import type { UserAnimeStatus } from '@/types/anime'

const route = useRoute()
const animeStore = useAnimeStore()

const loading = ref(true)
const updating = ref(false)
const userStatus = ref<UserAnimeStatus>('watching')
const episodesWatched = ref(0)

function getStatusColor(status: string): string {
  switch (status) {
    case 'airing':
      return 'success'
    case 'upcoming':
      return 'info'
    case 'finished':
      return 'grey'
    default:
      return 'primary'
  }
}

const similarAnime = computed(() => {
  if (!animeStore.currentAnime) return []

  return animeStore.animeList
    .filter(
      (anime) =>
        anime.id !== animeStore.currentAnime?.id &&
        anime.genres?.some((genreRelation) =>
          animeStore.currentAnime?.genres?.some((g) => g.genres.id === genreRelation.genres.id),
        ),
    )
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)
})

async function initialize() {
  loading.value = true
  try {
    await animeStore.fetchAnimeDetails(Number(route.params.id))

    // Load user's progress if they have any
    const userAnime = animeStore.userAnimeList.find(
      (item) => item.anime_id === Number(route.params.id),
    )

    if (userAnime) {
      userStatus.value = userAnime.status
      episodesWatched.value = userAnime.episodes_watched
    }
  } catch (error) {
    console.error('Error loading anime details:', error)
  } finally {
    loading.value = false
  }
}

async function updateProgress() {
  updating.value = true
  try {
    await animeStore.updateUserAnimeStatus(
      Number(route.params.id),
      userStatus.value,
      episodesWatched.value,
    )
  } catch (error) {
    console.error('Error updating progress:', error)
  } finally {
    updating.value = false
  }
}

function getCharacterIcon(name: string): string {
  // Rotujeme medzi rôznymi ikonami pre rozmanitosť
  const icons = [
    'mdi-account-circle',
    'mdi-account-cowboy-hat',
    'mdi-account-star',
    'mdi-account-heart',
    'mdi-account-box',
    'mdi-account-circle-outline',
    'mdi-account-tie',
    'mdi-account-supervisor',
  ]

  // Použijeme meno postavy na výber ikony (konzistentné pre rovnaké mená)
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % icons.length
  return icons[index]
}

onMounted(initialize)
watch(() => route.params.id, initialize)
</script>

<style scoped>
.anime-detail {
  background: #121212;
  min-height: 100vh;
  color: white;
}

.hero-carousel {
  margin-bottom: 2rem;
}

.hero-overlay {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 100%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}

.poster-image {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
  transition: transform 0.3s ease;
}

.poster-image:hover {
  transform: scale(1.02);
}

.on-hover {
  transition: all 0.3s ease;
}

.on-hover:hover {
  transform: translateY(-4px);
}

.v-card {
  border-radius: 12px;
  overflow: hidden;
  background: #1e1e1e !important;
  color: white !important;
}

.v-card-title {
  letter-spacing: 0.5px;
}

.v-chip {
  transition: all 0.2s ease;
}

.v-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

:deep(.v-list) {
  background: #1e1e1e !important;
  color: white !important;
}

:deep(.v-list-item) {
  color: white !important;
}

:deep(.v-list-item-subtitle) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.text-grey) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.v-field__input) {
  color: white !important;
}

:deep(.v-label) {
  color: rgba(255, 255, 255, 0.7) !important;
}

@media (max-width: 960px) {
  .hero-section {
    text-align: center;
  }

  .poster-image {
    margin: 0 auto;
    max-width: 300px;
  }
}

.character-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.character-icon-container {
  background: #2a2a2a;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.character-icon {
  opacity: 0.9;
  transition: all 0.3s ease;
}

.on-hover .character-icon {
  opacity: 1;
  transform: scale(1.1);
}

.v-card-text {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.gap-4 {
  gap: 1rem;
}

.gap-2 {
  gap: 0.5rem;
}
</style>
