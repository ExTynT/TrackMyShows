<template>
  <div class="genre-view">
    <v-container class="py-8">
      <div v-if="currentGenre" class="mb-8">
        <h1 class="text-h3 font-weight-bold mb-4">{{ currentGenre.name }} Anime</h1>
        <v-breadcrumbs
          :items="[
            { title: 'Home', to: '/' },
            { title: 'Anime', to: '/anime' },
            { title: currentGenre.name, disabled: true },
          ]"
        ></v-breadcrumbs>
      </div>

      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        </v-col>
      </v-row>

      <template v-else>
        <v-row>
          <!-- Filters -->
          <v-col cols="12" md="3">
            <v-card class="mb-4">
              <v-card-title>Filters</v-card-title>
              <v-card-text>
                <v-select
                  v-model="filters.status"
                  :items="['all', 'airing', 'finished', 'upcoming']"
                  label="Status"
                  class="mb-4"
                ></v-select>

                <v-select
                  v-model="filters.season"
                  :items="['all', 'winter', 'spring', 'summer', 'fall']"
                  label="Season"
                  class="mb-4"
                ></v-select>

                <v-select
                  v-model="filters.year"
                  :items="availableYears"
                  label="Year"
                  class="mb-4"
                ></v-select>

                <v-select
                  v-model="filters.sort"
                  :items="[
                    { title: 'Popularity', value: 'popularity' },
                    { title: 'Rating', value: 'rating' },
                    { title: 'Title', value: 'title' },
                  ]"
                  label="Sort By"
                ></v-select>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Anime Grid -->
          <v-col cols="12" md="9">
            <v-row v-if="filteredAnime.length > 0">
              <v-col v-for="anime in filteredAnime" :key="anime.id" cols="12" sm="6" lg="4">
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    :elevation="isHovering ? 8 : 2"
                    :class="{ 'on-hover': isHovering }"
                    v-bind="props"
                    @click="router.push('/anime/' + anime.id)"
                  >
                    <v-img :src="anime.image_url" height="350" cover class="align-end">
                      <v-card-title class="text-white bg-black bg-opacity-50">
                        {{ anime.title }}
                      </v-card-title>
                    </v-img>
                    <v-card-text>
                      <div class="d-flex align-center mb-2">
                        <v-rating
                          v-model="anime.rating"
                          color="amber"
                          density="compact"
                          half-increments
                          readonly
                          size="small"
                        ></v-rating>
                        <span class="text-grey-darken-2 ms-2">{{ anime.rating }}/5</span>
                      </div>
                      <p class="text-grey-darken-1">
                        {{ anime.status }} • {{ anime.episodes || '?' }} episodes
                      </p>
                      <div class="d-flex flex-wrap gap-1 mt-2">
                        <v-chip
                          v-for="studio in anime.studios"
                          :key="studio.studios.id"
                          size="small"
                          color="primary"
                          variant="outlined"
                          class="me-1 mb-1"
                        >
                          {{ studio.studios.name }}
                        </v-chip>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12" class="text-center">
                <v-icon size="64" color="grey" class="mb-4">mdi-alert</v-icon>
                <h3 class="text-h5 text-grey-darken-1">No anime found matching your filters</h3>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnimeStore } from '@/stores/animeStore'
import type { Genre } from '@/types/anime'

const route = useRoute()
const router = useRouter()
const animeStore = useAnimeStore()

const loading = ref(true)
const currentGenre = ref<Genre | null>(null)

const filters = ref({
  status: 'all',
  season: 'all',
  year: 'all',
  sort: 'popularity',
})

const availableYears = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = ['all']
  for (let year = currentYear + 1; year >= 2000; year--) {
    years.push(year.toString())
  }
  return years
})

const filteredAnime = computed(() => {
  let result = animeStore.animeList.filter((anime) =>
    anime.genres?.some((genreRelation) => genreRelation.genres.id === Number(route.params.id)),
  )

  // Apply status filter
  if (filters.value.status !== 'all') {
    result = result.filter((anime) => anime.status === filters.value.status)
  }

  // Apply season filter
  if (filters.value.season !== 'all') {
    result = result.filter((anime) => anime.season === filters.value.season)
  }

  // Apply year filter
  if (filters.value.year !== 'all') {
    result = result.filter((anime) => anime.year === Number(filters.value.year))
  }

  // Apply sorting
  result.sort((a, b) => {
    switch (filters.value.sort) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      case 'title':
        return a.title.localeCompare(b.title)
      case 'popularity':
      default:
        return (b.popularity ?? 0) - (a.popularity ?? 0)
    }
  })

  return result
})

async function initialize() {
  loading.value = true
  try {
    await Promise.all([animeStore.fetchAnimeList(), animeStore.fetchGenres()])

    const genre = animeStore.genres.find((g) => g.id === Number(route.params.id))
    if (!genre) {
      router.push('/anime')
      return
    }

    currentGenre.value = genre
  } catch (error) {
    console.error('Error initializing genre view:', error)
  } finally {
    loading.value = false
  }
}

onMounted(initialize)

watch(() => route.params.id, initialize)
</script>

<style scoped>
.on-hover {
  transition: all 0.3s ease;
}

.genre-view {
  min-height: 100vh;
}
</style>
