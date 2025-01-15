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
                  item-title="title"
                  item-value="value"
                  label="Sort By"
                ></v-select>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Anime Grid -->
          <v-col cols="12" md="9">
            <v-row>
              <v-col v-for="anime in filteredAnime" :key="anime.id" cols="12" sm="6" md="4">
                <MediaGridCard
                  :item="{
                    id: anime.id,
                    title: anime.title,
                    image_url: anime.image_url || '',
                    rating: anime.rating || 0,
                    genres:
                      anime.genres?.map((g) => ({ id: g.genres.id, name: g.genres.name })) || [],
                  }"
                  type="anime"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnimeStore } from '@/stores/animeStore'
import MediaGridCard from '@/components/common/MediaGridCard.vue'
import type { Genre } from '@/types/anime'

export default defineComponent({
  name: 'AnimeGenreView',

  components: {
    MediaGridCard,
  },

  data() {
    return {
      route: useRoute(),
      router: useRouter(),
      animeStore: useAnimeStore(),
      loading: true,
      currentGenre: null as Genre | null,
      filters: {
        status: 'all',
        season: 'all',
        year: 'all',
        sort: 'popularity',
      },
    }
  },

  computed: {
    availableYears(): string[] {
      const currentYear = new Date().getFullYear()
      const years = ['all']
      for (let year = currentYear + 1; year >= 2000; year--) {
        years.push(year.toString())
      }
      return years
    },

    filteredAnime() {
      let result = this.animeStore.animeList.filter((anime) =>
        anime.genres?.some(
          (genreRelation) => genreRelation.genres.id === Number(this.route.params.id),
        ),
      )

      // Apply status filter
      if (this.filters.status !== 'all') {
        result = result.filter((anime) => anime.status === this.filters.status)
      }

      // Apply season filter
      if (this.filters.season !== 'all') {
        result = result.filter((anime) => anime.season === this.filters.season)
      }

      // Apply year filter
      if (this.filters.year !== 'all') {
        result = result.filter((anime) => anime.year === Number(this.filters.year))
      }

      // Apply sorting
      switch (this.filters.sort) {
        case 'rating':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        case 'title':
          result.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'popularity':
        default:
          result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
          break
      }

      return result
    },
  },

  async mounted() {
    if (this.animeStore.animeList.length === 0) {
      await this.animeStore.fetchAnimeList()
    }

    const genreId = Number(this.route.params.id)
    this.currentGenre =
      this.animeStore.animeList
        .flatMap((anime) => anime.genres || [])
        .find((genreRelation) => genreRelation.genres.id === genreId)?.genres || null

    this.loading = false
  },
})
</script>

<style scoped>
.genre-view {
  min-height: 100vh;
}
</style>
