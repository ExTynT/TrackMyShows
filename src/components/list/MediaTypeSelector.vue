<template>
  <div class="d-flex align-center justify-space-between mb-3">
    <h1 class="text-h3 font-weight-bold">Browse {{ mediaType === 'anime' ? 'Anime' : 'Manga' }}</h1>
    <v-btn-group>
      <v-btn
        :color="'primary'"
        :variant="mediaType === 'anime' ? 'tonal' : 'outlined'"
        class="text-none"
        @click="$emit('update:mediaType', 'anime')"
      >
        <v-icon start>mdi-television-classic</v-icon>
        Anime
      </v-btn>
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
  <div class="text-subtitle-1 text-grey">
    Search and filter {{ mediaType === 'anime' ? 'anime' : 'manga' }} by title and genres
  </div>
</template>

<script lang="ts">
export default {
  name: 'MediaTypeSelector',

  props: {
    mediaType: {
      type: String as () => 'anime' | 'manga',
      required: true,
    },
  },

  emits: ['update:mediaType'],
}
</script>
