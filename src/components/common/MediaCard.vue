<!-- Karta pre zobrazenie média (anime/manga) -->
<template>
  <!-- Efekt pri prejdení myšou -->
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      :elevation="isHovering ? 8 : 2"
      :class="{ 'on-hover': isHovering }"
      v-bind="props"
      @click="handleClick"
    >
      <div class="d-flex">
        <!-- Obrázok média -->
        <v-img :src="item.image_url" height="200" width="140" cover class="media-image"></v-img>
        <div class="pa-4 flex-grow-1">
          <!-- Názov a hodnotenie -->
          <div class="d-flex justify-space-between align-center">
            <h3 class="text-h6 font-weight-bold">{{ item.title }}</h3>
            <div class="d-flex align-center">
              <v-icon color="amber" class="me-1">mdi-star</v-icon>
              <span class="text-h6">{{ item.rating }}</span>
            </div>
          </div>
          <!-- Krátky popis -->
          <p class="mt-2 text-grey text-truncate">{{ item.synopsis }}</p>
          <!-- Žánre -->
          <div class="mt-2">
            <v-chip
              v-for="genre in item.genres"
              :key="genre.id"
              class="me-2 mb-2"
              size="small"
              variant="outlined"
            >
              {{ genre.name }}
            </v-chip>
          </div>
          <!-- Štatistiky (epizódy/kapitoly) -->
          <div class="mt-2 d-flex align-center">
            <v-icon size="small" class="me-1">{{ statsIcon }}</v-icon>
            <span class="text-body-2">{{ item.stats.count }} {{ item.stats.unit }}</span>
            <template v-if="secondaryStats">
              <v-divider vertical class="mx-3"></v-divider>
              <v-icon size="small" class="me-1">{{ secondaryStatsIcon }}</v-icon>
              <span class="text-body-2">{{ secondaryStats.count }} {{ secondaryStats.unit }}</span>
            </template>
          </div>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
// Importy potrebných závislostí
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

// Rozhrania pre typy dát
export interface Genre {
  id: number
  name: string
}

export interface Stats {
  count: number
  unit: string
}

export interface MediaItem {
  id: number
  title: string
  synopsis: string
  image_url: string
  rating: number
  genres: Genre[]
  stats: Stats
}

export default defineComponent({
  name: 'MediaCard',

  // Vlastnosti komponentu
  props: {
    // Položka média (anime/manga)
    item: {
      type: Object as () => MediaItem,
      required: true,
    },
    // Typ média (anime/manga)
    type: {
      type: String as () => 'anime' | 'manga',
      required: true,
    },
    // Ikona pre hlavné štatistiky
    statsIcon: {
      type: String,
      default: 'mdi-play-circle',
    },
    // Sekundárne štatistiky
    secondaryStats: {
      type: Object as () => Stats | undefined,
      default: undefined,
    },
    // Ikona pre sekundárne štatistiky
    secondaryStatsIcon: {
      type: String,
      default: 'mdi-book-multiple',
    },
  },

  // Základný stav komponentu
  data() {
    return {
      router: useRouter(),
    }
  },

  // Metódy komponentu
  methods: {
    // Presmerovanie na detail položky
    handleClick() {
      this.router.push(`/${this.type}/${this.item.id}`)
    },
  },
})
</script>

<style scoped>
.on-hover {
  transform: translateY(-4px);
  transition: all 0.3s ease;
}

.v-card {
  cursor: pointer;
}

.media-image {
  border-radius: 4px;
  overflow: hidden;
}

.text-h6 {
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
