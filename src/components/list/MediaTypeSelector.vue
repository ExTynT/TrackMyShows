<!-- Prepínač typu média (anime/manga) -->
<template>
  <div class="d-flex align-center justify-space-between mb-3">
    <!-- Nadpis s aktuálnym typom média -->
    <h1 class="text-h3 font-weight-bold">Browse {{ mediaType === 'anime' ? 'Anime' : 'Manga' }}</h1>
    <!-- Skupina tlačidiel pre výber typu -->
    <v-btn-group>
      <!-- Tlačidlo pre anime -->
      <v-btn
        :color="'primary'"
        :variant="mediaType === 'anime' ? 'tonal' : 'outlined'"
        class="text-none"
        @click="$emit('update:mediaType', 'anime')"
      >
        <v-icon start>mdi-television-classic</v-icon>
        Anime
      </v-btn>
      <!-- Tlačidlo pre mangu -->
      <v-btn
        :color="'primary'"
        :variant="mediaType === 'manga' ? 'tonal' : 'outlined'"
        class="text-none"
        @click="$emit('update:mediaType', 'manga')"
      >
        <v-icon start>mdi-book-open-variant</v-icon>
        Manga
      </v-btn>
    </v-btn-group>
  </div>
  <!-- Popis vyhľadávania -->
  <div class="text-subtitle-1 text-grey">
    Search and filter {{ mediaType === 'anime' ? 'anime' : 'manga' }} by title and genres
  </div>
</template>

<script lang="ts">
// Definícia komponentu pre výber typu média
export default {
  name: 'MediaTypeSelector',

  // Vlastnosti komponentu
  props: {
    // Aktuálne zvolený typ média
    mediaType: {
      type: String as () => 'anime' | 'manga',
      required: true,
    },
  },

  // Definícia emitovaných udalostí
  emits: ['update:mediaType'],
}
</script>
