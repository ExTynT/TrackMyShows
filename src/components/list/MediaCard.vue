<!-- Karta pre zobrazenie média (anime/manga) -->
<template>
  <!-- Efekt pri prejdení myšou -->
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      :elevation="isHovering ? 8 : 2"
      :class="{ 'on-hover': isHovering }"
      class="transition-swing"
      @click="$emit('click', item.id)"
    >
      <!-- Obrázok s titulkom -->
      <v-img :src="item.image_url" height="350" cover class="align-end">
        <v-card-title class="text-white bg-black bg-opacity-50 text-truncate">
          {{ item.title }}
        </v-card-title>
      </v-img>

      <!-- Zoznam žánrov -->
      <v-card-text>
        <div class="d-flex flex-wrap gap-1 mt-2">
          <v-chip
            v-for="genre in item.genres || []"
            :key="'genres' in genre ? genre.genres.id : genre.id"
            size="small"
            class="mr-1 mb-1"
            variant="outlined"
          >
            {{ 'genres' in genre ? genre.genres.name : genre.name }}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
// Importy potrebných typov
import type { Anime } from '@/types/anime'
import type { Manga } from '@/types/manga'

export default {
  name: 'MediaCard',

  // Vlastnosti komponentu
  props: {
    // Položka média (anime/manga)
    item: {
      type: Object as () => Anime | Manga,
      required: true,
    },
  },

  // Definícia emitovaných udalostí
  emits: ['click'],
}
</script>

<style scoped>
.on-hover {
  transform: translateY(-4px);
}

.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>
