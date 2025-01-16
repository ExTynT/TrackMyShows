<template>
  <div class="list-view">
    <v-container class="py-12">
      <!-- Prepínač medzi anime a mangou -->
      <div class="header-section mb-12">
        <media-type-selector
          v-model:mediaType="mediaType"
          @update:mediaType="handleMediaTypeChange"
        />
      </div>

      <!-- Vyhľadávanie a filtrovanie -->
      <media-search-filter :available-genres="availableGenres" @search="handleSearch" />

      <!-- Zobrazenie výsledkov -->
      <media-grid :items="filteredResults" :loading="loading" @item-click="navigateToDetail" />
    </v-container>
  </div>
</template>

<script lang="ts">
// Importy komponentov a store manažérov
import { mapState, mapActions } from 'pinia'
import { useAnimeStore } from '@/stores/animeStore'
import { useMangaStore } from '@/stores/mangaStore'
import type { Anime } from '@/types/anime'
import type { Manga } from '@/types/manga'
import router from '@/router'

import MediaTypeSelector from '@/components/list/MediaTypeSelector.vue'
import MediaSearchFilter from '@/components/list/MediaSearchFilter.vue'
import MediaGrid from '@/components/list/MediaGrid.vue'

// Definícia typu pre stav komponentu
interface MediaListState {
  mediaType: 'anime' | 'manga'
  searchQuery: string
  selectedGenres: string[]
  loading: boolean
}

export default {
  name: 'ListView',

  components: {
    MediaTypeSelector,
    MediaSearchFilter,
    MediaGrid,
  },

  // Základný stav komponentu
  data(): MediaListState {
    return {
      mediaType: 'anime',
      searchQuery: '',
      selectedGenres: [],
      loading: false,
    }
  },

  computed: {
    ...mapState(useAnimeStore, ['animeList']), // Mapovanie stavu z animeStore
    ...mapState(useMangaStore, ['mangaList']), // Mapovanie stavu z mangaStore

    // Získanie dostupných žánrov z aktuálneho zoznamu
    availableGenres(): string[] {
      const items = this.mediaType === 'anime' ? this.animeList : this.mangaList
      const genreSet = new Set<string>()

      items.forEach((item: Anime | Manga) => {
        if (item.genres) {
          item.genres.forEach((genre) => {
            const genreName = 'genres' in genre ? genre.genres.name : genre.name
            genreSet.add(genreName)
          })
        }
      })

      return Array.from(genreSet).sort()
    },

    // Filtrovanie výsledkov podľa vyhľadávania a žánrov
    filteredResults(): (Anime | Manga)[] {
      const items = this.mediaType === 'anime' ? this.animeList : this.mangaList

      return items.filter((item: Anime | Manga) => {
        return this.filterByTitle(item) && this.filterByGenres(item)
      })
    },
  },

  methods: {
    ...mapActions(useAnimeStore, ['fetchAnimeList']),
    ...mapActions(useMangaStore, ['fetchMangaList']),

    // Filtrovanie podľa názvu
    filterByTitle(item: Anime | Manga): boolean {
      if (!this.searchQuery) return true

      const searchLower = this.searchQuery.toLowerCase()
      return (
        item.title.toLowerCase().includes(searchLower) ||
        (item.japanese_title?.toLowerCase().includes(searchLower) ?? false)
      )
    },

    // Filtrovanie podľa žánrov
    filterByGenres(item: Anime | Manga): boolean {
      if (this.selectedGenres.length === 0) return true

      return this.selectedGenres.every(
        (selectedGenre) =>
          item.genres?.some((genre) => {
            const genreName = 'genres' in genre ? genre.genres.name : genre.name
            return genreName.toLowerCase() === selectedGenre.toLowerCase()
          }) ?? false,
      )
    },

    // Zmena typu média (anime/manga)
    handleMediaTypeChange(type: 'anime' | 'manga'): void {
      this.mediaType = type
      this.loadData()
    },

    // Vyhľadávanie
    handleSearch({ query, genres }: { query: string; genres: string[] }): void {
      this.searchQuery = query
      this.selectedGenres = genres
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },

    // Presmerovanie na detail položky
    navigateToDetail(id: number): void {
      router.push(`/${this.mediaType}/${id}`)
    },

    // Načítanie dát podľa zvoleného typu média
    async loadData(): Promise<void> {
      this.loading = true
      try {
        if (this.mediaType === 'anime') {
          if (this.animeList.length === 0) {
            await this.fetchAnimeList()
          }
        } else {
          if (this.mangaList.length === 0) {
            await this.fetchMangaList()
          }
        }
      } catch (error) {
        console.error(`Error loading ${this.mediaType} data:`, error)
      } finally {
        this.loading = false
      }
    },
  },

  // Načítanie dát pri vytvorení komponentu
  created() {
    this.loadData()
  },
}
</script>

<style scoped>
.list-view {
  min-height: 100vh;
  background: #121212;
  color: white;
}

.header-section {
  position: relative;
}

.header-section::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--v-primary-base);
  border-radius: 2px;
}
</style>
