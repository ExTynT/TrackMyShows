<!-- Karta s podobnými médiami -->
<template>
  <v-card elevation="2">
    <!-- Nadpis karty -->
    <v-card-title class="text-h5 py-4 px-6 bg-primary text-white">
      <v-icon start class="me-2">{{
        type === 'anime' ? 'mdi-television-classic' : 'mdi-book-multiple'
      }}</v-icon>
      Similar {{ type === 'anime' ? 'Anime' : 'Manga' }}
    </v-card-title>
    <!-- Zoznam podobných médií -->
    <v-card-text class="pa-6">
      <v-list>
        <!-- Položka zoznamu s odkazom na detail -->
        <v-list-item v-for="item in items" :key="item.id" :to="`/${type}/${item.id}`" class="mb-2">
          <!-- Náhľadový obrázok -->
          <template v-slot:prepend>
            <v-avatar size="48">
              <v-img :src="item.image_url" cover></v-img>
            </v-avatar>
          </template>
          <!-- Názov média -->
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <!-- Hodnotenie -->
          <v-list-item-subtitle class="d-flex align-center">
            <v-rating
              :model-value="item.rating"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="x-small"
            ></v-rating>
            <span class="ms-2 text-grey">{{ item.rating }}/5</span>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
// Importy potrebných závislostí
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { MediaItem } from '@/types/media'

export default defineComponent({
  name: 'MediaDetailSimilar',

  // Vlastnosti komponentu
  props: {
    // Typ média (anime/manga)
    type: {
      type: String as PropType<'anime' | 'manga'>,
      required: true,
    },
    // Zoznam podobných médií
    items: {
      type: Array as PropType<MediaItem[]>,
      required: true,
    },
  },
})
</script>

<style scoped>
.v-card {
  border-radius: 12px;
  overflow: hidden;
  background: #1e1e1e !important;
  color: white !important;
}

.v-card-title {
  letter-spacing: 0.5px;
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
</style>
