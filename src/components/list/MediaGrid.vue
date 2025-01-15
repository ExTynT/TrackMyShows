<template>
  <div>
    <!-- Loading State -->
    <v-row v-if="loading">
      <v-col cols="12" class="d-flex justify-center align-center" style="min-height: 400px">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </v-col>
    </v-row>

    <!-- Results Grid -->
    <template v-else>
      <v-row v-if="items.length > 0">
        <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4" lg="3">
          <media-card :item="item" @click="$emit('itemClick', item.id)" />
        </v-col>
      </v-row>

      <!-- Empty State -->
      <v-row v-else>
        <v-col cols="12">
          <v-card class="pa-12 text-center" variant="flat">
            <v-icon size="64" color="grey" class="mb-4">mdi-magnify-close</v-icon>
            <h2 class="text-h5 text-grey-darken-1 mb-2">No results found</h2>
            <p class="text-body-1 text-grey mb-6">Try adjusting your search criteria</p>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script lang="ts">
import type { Anime } from '@/types/anime'
import type { Manga } from '@/types/manga'
import MediaCard from './MediaCard.vue'

export default {
  name: 'MediaGrid',

  components: {
    MediaCard,
  },

  props: {
    items: {
      type: Array as () => (Anime | Manga)[],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['itemClick'],
}
</script>
