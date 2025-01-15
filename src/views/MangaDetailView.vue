<template>
  <div v-if="loading" class="d-flex justify-center align-center" style="min-height: 400px">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else-if="mangaStore.currentManga" class="manga-detail">
    <!-- Hero Section -->
    <v-carousel
      cycle
      height="600"
      hide-delimiter-background
      show-arrows="hover"
      class="hero-carousel"
    >
      <v-carousel-item>
        <v-img :src="mangaStore.currentManga.cover_image_url" height="600" cover>
          <div class="hero-overlay">
            <v-container>
              <v-row>
                <v-col cols="12" md="3">
                  <v-img
                    :src="mangaStore.currentManga.image_url"
                    height="400"
                    class="poster-image"
                    cover
                  ></v-img>
                </v-col>
                <v-col cols="12" md="9" class="d-flex flex-column justify-center">
                  <h1 class="text-h2 font-weight-bold text-white mb-4">
                    {{ mangaStore.currentManga.title }}
                  </h1>
                  <p class="text-h6 text-white mb-4" v-if="mangaStore.currentManga.japanese_title">
                    {{ mangaStore.currentManga.japanese_title }}
                  </p>
                  <div class="d-flex align-center mb-6">
                    <v-rating
                      v-model="mangaStore.currentManga.rating"
                      color="amber"
                      half-increments
                      readonly
                      size="small"
                    ></v-rating>
                    <span class="text-white ms-2">{{ mangaStore.currentManga.rating }}/5</span>
                  </div>
                  <p class="text-white text-body-1">{{ mangaStore.currentManga.synopsis }}</p>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-img>
      </v-carousel-item>

      <v-carousel-item>
        <v-img :src="mangaStore.currentManga.cover_image_url" height="600" cover>
          <div class="hero-overlay">
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-column justify-center text-center">
                  <h2 class="text-h3 font-weight-bold text-white mb-6">Author Spotlight</h2>
                  <div class="d-flex justify-center flex-wrap gap-4 mb-6">
                    <v-chip
                      v-for="author in mangaStore.currentManga.authors"
                      :key="author.id"
                      size="x-large"
                      class="pa-4"
                      color="primary"
                    >
                      <v-icon start>mdi-pencil</v-icon>
                      {{ author.name }}
                    </v-chip>
                  </div>
                  <div class="d-flex justify-center flex-wrap gap-2">
                    <v-chip
                      v-for="genre in mangaStore.currentManga.genres"
                      :key="genre.id"
                      variant="outlined"
                      class="ma-1"
                    >
                      {{ genre.name }}
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-img>
      </v-carousel-item>

      <v-carousel-item>
        <v-img :src="mangaStore.currentManga.cover_image_url" height="600" cover>
          <div class="hero-overlay">
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex flex-column justify-center text-center">
                  <h2 class="text-h3 font-weight-bold text-white mb-6">Quick Stats</h2>
                  <v-row justify="center">
                    <v-col cols="12" sm="4">
                      <div class="stat-card pa-4 rounded-lg">
                        <v-icon size="48" color="primary" class="mb-2"
                          >mdi-book-open-variant</v-icon
                        >
                        <h3 class="text-h4 font-weight-bold mb-2">
                          {{ mangaStore.currentManga.chapters || '?' }}
                        </h3>
                        <p class="text-body-1">Chapters</p>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="stat-card pa-4 rounded-lg">
                        <v-icon size="48" color="primary" class="mb-2">mdi-star</v-icon>
                        <h3 class="text-h4 font-weight-bold mb-2">
                          {{ mangaStore.currentManga.rating }}/5
                        </h3>
                        <p class="text-body-1">Rating</p>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="stat-card pa-4 rounded-lg">
                        <v-icon size="48" color="primary" class="mb-2">mdi-calendar</v-icon>
                        <h3 class="text-h4 font-weight-bold mb-2 text-capitalize">
                          {{ mangaStore.currentManga.status }}
                        </h3>
                        <p class="text-body-1">{{ mangaStore.currentManga.year }}</p>
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
            <v-card-title class="text-h5 py-4 px-6 bg-primary text-white">
              <v-icon start class="me-2">mdi-information</v-icon>
              Details
            </v-card-title>
            <v-card-text class="pa-6">
              <v-row>
                <v-col cols="4" class="text-grey text-subtitle-1">Status</v-col>
                <v-col cols="8" class="text-subtitle-1">
                  <v-chip :color="getStatusColor(mangaStore.currentManga.status)" label>
                    {{ mangaStore.currentManga.status }}
                  </v-chip>
                </v-col>

                <v-col cols="4" class="text-grey text-subtitle-1">Chapters</v-col>
                <v-col cols="8" class="text-subtitle-1">
                  {{ mangaStore.currentManga.chapters || 'Unknown' }}
                </v-col>

                <v-col cols="4" class="text-grey text-subtitle-1">Volumes</v-col>
                <v-col cols="8" class="text-subtitle-1">
                  {{ mangaStore.currentManga.volumes || 'Unknown' }}
                </v-col>

                <v-col cols="4" class="text-grey text-subtitle-1">Authors</v-col>
                <v-col cols="8">
                  <v-chip
                    v-for="author in mangaStore.currentManga.authors"
                    :key="author.id"
                    class="mr-2 mb-2"
                    color="primary"
                    variant="outlined"
                  >
                    <v-icon start>mdi-account</v-icon>
                    {{ author.name }}
                  </v-chip>
                </v-col>

                <v-col cols="4" class="text-grey text-subtitle-1">Genres</v-col>
                <v-col cols="8">
                  <v-chip
                    v-for="genre in mangaStore.currentManga.genres"
                    :key="genre.id"
                    class="mr-2 mb-2"
                    variant="outlined"
                  >
                    {{ genre.name }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Characters Section -->
          <v-card class="mb-6" elevation="2">
            <v-card-title class="text-h5 py-4 px-6 bg-primary text-white">
              <v-icon start class="me-2">mdi-account-multiple</v-icon>
              Characters
            </v-card-title>
            <v-card-text class="pa-6">
              <v-row>
                <v-col
                  v-for="character in mangaStore.currentManga?.characters"
                  :key="character.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card class="character-card" flat>
                    <v-img
                      :src="character.image_url || 'https://via.placeholder.com/150'"
                      height="200"
                      cover
                      class="character-image"
                    >
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-icon size="large" color="grey">mdi-account</v-icon>
                        </div>
                      </template>
                    </v-img>
                    <v-card-title class="text-subtitle-1 pt-2">
                      <v-icon start size="small" color="primary" class="me-1">mdi-account</v-icon>
                      {{ character.name }}
                    </v-card-title>
                    <v-card-subtitle v-if="character.japanese_name" class="pb-0">
                      <v-icon start size="small" color="grey" class="me-1"
                        >mdi-syllabary-hiragana</v-icon
                      >
                      {{ character.japanese_name }}
                    </v-card-subtitle>
                    <v-card-text class="text-body-2">
                      <v-icon start size="small" color="grey" class="me-1">mdi-card-text</v-icon>
                      {{ character.description }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Sidebar -->
        <v-col cols="12" md="4">
          <!-- User Progress -->
          <v-card class="mb-6" elevation="2">
            <v-card-title class="text-h5 py-4 px-6 bg-primary text-white">
              <v-icon start class="me-2">mdi-bookmark</v-icon>
              Your Progress
            </v-card-title>
            <v-card-text class="pa-6">
              <v-select
                v-model="userStatus"
                :items="['reading', 'completed', 'on_hold', 'dropped', 'plan_to_read']"
                label="Status"
                class="mb-4"
              ></v-select>
              <v-text-field
                v-model="chaptersRead"
                type="number"
                :max="mangaStore.currentManga.chapters"
                min="0"
                label="Chapters Read"
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

          <!-- Similar Manga -->
          <v-card elevation="2">
            <v-card-title class="text-h5 py-4 px-6 bg-primary text-white">
              <v-icon start class="me-2">mdi-book-multiple</v-icon>
              Similar Manga
            </v-card-title>
            <v-card-text class="pa-6">
              <v-list>
                <v-list-item
                  v-for="manga in similarManga"
                  :key="manga.id"
                  :to="'/manga/' + manga.id"
                  class="mb-2"
                >
                  <template v-slot:prepend>
                    <v-avatar size="48">
                      <v-img :src="manga.image_url" cover></v-img>
                    </v-avatar>
                  </template>
                  <v-list-item-title>{{ manga.title }}</v-list-item-title>
                  <v-list-item-subtitle class="d-flex align-center">
                    <v-rating
                      v-model="manga.rating"
                      color="amber"
                      density="compact"
                      half-increments
                      readonly
                      size="x-small"
                    ></v-rating>
                    <span class="ms-2 text-grey">{{ manga.rating }}/5</span>
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
      <h3 class="text-h5 text-grey-darken-1">Manga not found</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMangaStore } from '@/stores/mangaStore'
import type { UserMangaStatus } from '@/types/manga'

const route = useRoute()
const mangaStore = useMangaStore()

const loading = ref(true)
const updating = ref(false)
const userStatus = ref<UserMangaStatus>('reading')
const chaptersRead = ref(0)

function getStatusColor(status: string): string {
  switch (status) {
    case 'ongoing':
      return 'success'
    case 'hiatus':
      return 'warning'
    case 'completed':
      return 'grey'
    case 'cancelled':
      return 'error'
    default:
      return 'primary'
  }
}

const similarManga = computed(() => {
  if (!mangaStore.currentManga) return []

  return mangaStore.mangaList
    .filter(
      (manga) =>
        manga.id !== mangaStore.currentManga?.id &&
        manga.genres?.some((genre) =>
          mangaStore.currentManga?.genres?.some((g) => g.id === genre.id),
        ),
    )
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)
})

async function initialize() {
  loading.value = true
  try {
    await mangaStore.fetchMangaDetail(Number(route.params.id))

    // Load user's progress if they have any
    const userManga = mangaStore.userMangaList.find(
      (item) => item.manga_id === Number(route.params.id),
    )

    if (userManga) {
      userStatus.value = userManga.status
      chaptersRead.value = userManga.chapters_read
    }
  } catch (error) {
    console.error('Error loading manga details:', error)
  } finally {
    loading.value = false
  }
}

async function updateProgress() {
  updating.value = true
  try {
    await mangaStore.updateUserMangaStatus(
      Number(route.params.id),
      userStatus.value,
      chaptersRead.value,
    )
  } catch (error) {
    console.error('Error updating progress:', error)
  } finally {
    updating.value = false
  }
}

onMounted(initialize)
watch(() => route.params.id, initialize)
</script>

<style scoped>
.manga-detail {
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

.character-card {
  transition: transform 0.2s ease;
  height: 100%;
  background: rgba(255, 255, 255, 0.05) !important;
}

.character-card:hover {
  transform: translateY(-4px);
}

.character-image {
  border-radius: 8px 8px 0 0;
  transition: opacity 0.2s ease;
}

.character-image:hover {
  opacity: 0.9;
}
</style>
