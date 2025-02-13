<!-- Karta pre najlepšie hodnotené médiá -->
<template>
  <v-card class="top-rated-card" @click="$emit('click')">
    <v-row no-gutters>
      <!-- Odznak s poradím -->
      <v-col cols="auto">
        <div class="rank-badge">
          <span class="text-h5">#{{ rank }}</span>
        </div>
      </v-col>

      <!-- Obrázok média -->
      <v-col cols="auto">
        <v-img :src="media.image_url" width="120" height="180" cover></v-img>
      </v-col>

      <!-- Obsah karty -->
      <v-col>
        <v-card-text class="d-flex flex-column h-100">
          <!-- Názov a hodnotenie -->
          <div>
            <h3 class="text-h6 mb-2">{{ media.title }}</h3>
            <div class="d-flex align-center mb-2">
              <v-rating
                v-if="media.rating"
                :model-value="media.rating"
                color="warning"
                density="compact"
                half-increments
                readonly
                size="small"
              ></v-rating>
              <span v-if="media.rating" class="text-grey-darken-1 text-caption ms-2">
                {{ media.rating }}/5
              </span>
              <span v-else class="text-grey-darken-1 text-caption">No rating yet</span>
            </div>
          </div>

          <!-- Popis -->
          <p class="text-body-2 text-grey-darken-1 mb-2">{{ media.synopsis }}</p>

          <!-- Detaily o počte epizód/kapitol a stave -->
          <div class="mt-auto">
            <p class="text-caption text-grey-darken-1 mb-1">
              {{ type === 'anime' ? 'Episodes' : 'Chapters' }}:
              {{ getMediaCount(media) || 'Unknown' }}
            </p>
            <p class="text-caption text-grey-darken-1 mb-0">Status: {{ media.status }}</p>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { Anime } from '../../types/anime'
import type { Manga } from '../../types/manga'

export default {
  name: 'TopRatedMediaCard',

  props: {
    type: {
      type: String as PropType<'anime' | 'manga'>,
      required: true,
    },
    media: {
      type: Object as PropType<Anime | Manga>,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
  },

  emits: ['click'],

  methods: {
    getMediaCount(media: Anime | Manga): number | undefined {
      if (this.type === 'anime') {
        return (media as Anime).episodes
      }
      return (media as Manga).chapters
    },
  },
}
</script>

<style scoped>
.top-rated-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;
}

.top-rated-card:hover {
  transform: translateY(-4px);
}

.rank-badge {
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 1;
}

.v-card-text {
  padding: 16px;
  height: 180px;
  overflow: hidden;
}

.text-body-2 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
