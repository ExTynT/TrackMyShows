<template>
  <v-carousel
    cycle
    height="600"
    hide-delimiter-background
    show-arrows="hover"
    class="hero-carousel"
  >
    <!-- Main Info Slide -->
    <v-carousel-item>
      <v-img :src="media.image_url" height="600" cover>
        <div class="hero-overlay">
          <v-container>
            <v-row>
              <v-col cols="12" md="3">
                <v-img :src="media.image_url" height="400" class="poster-image" cover></v-img>
              </v-col>
              <v-col cols="12" md="9" class="d-flex flex-column justify-center">
                <h1 class="text-h2 font-weight-bold text-white mb-4">
                  {{ media.title }}
                </h1>
                <p class="text-h6 text-white mb-4" v-if="media.japanese_title">
                  {{ media.japanese_title }}
                </p>
                <div class="d-flex align-center mb-6">
                  <v-rating
                    :model-value="media.rating"
                    color="amber"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>
                  <span class="text-white ms-2">{{ media.rating }}/5</span>
                </div>
                <p class="text-white text-body-1">{{ media.synopsis }}</p>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-img>
    </v-carousel-item>

    <!-- Credits Slide -->
    <v-carousel-item>
      <v-img :src="media.image_url" height="600" cover>
        <div class="hero-overlay">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex flex-column justify-center text-center">
                <h2 class="text-h3 font-weight-bold text-white mb-6">{{ creditTitle }}</h2>
                <div class="d-flex justify-center flex-wrap gap-4 mb-6">
                  <v-chip
                    v-for="credit in credits"
                    :key="credit.id"
                    size="x-large"
                    class="pa-4"
                    color="primary"
                  >
                    <template v-if="type === 'anime' && credit.logo_url">
                      <v-img
                        :src="credit.logo_url"
                        height="24"
                        width="48"
                        class="me-2"
                        contain
                      ></v-img>
                    </template>
                    <v-icon v-else-if="type === 'manga'" start>mdi-pencil</v-icon>
                    {{ credit.name }}
                  </v-chip>
                </div>
                <div class="d-flex justify-center flex-wrap gap-2">
                  <v-chip v-for="genre in genres" :key="genre.id" variant="outlined" class="ma-1">
                    {{ genre.name }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-img>
    </v-carousel-item>

    <!-- Stats Slide -->
    <v-carousel-item>
      <v-img :src="media.image_url" height="600" cover>
        <div class="hero-overlay">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex flex-column justify-center text-center">
                <h2 class="text-h3 font-weight-bold text-white mb-6">Quick Stats</h2>
                <v-row justify="center">
                  <v-col cols="12" sm="4">
                    <div class="stat-card pa-4 rounded-lg">
                      <v-icon size="48" color="primary" class="mb-2">
                        {{ type === 'anime' ? 'mdi-television-classic' : 'mdi-book-open-variant' }}
                      </v-icon>
                      <h3 class="text-h4 font-weight-bold mb-2">
                        {{ contentCount }}
                      </h3>
                      <p class="text-body-1">{{ countLabel }}</p>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <div class="stat-card pa-4 rounded-lg">
                      <v-icon size="48" color="primary" class="mb-2">mdi-star</v-icon>
                      <h3 class="text-h4 font-weight-bold mb-2">{{ media.rating }}/5</h3>
                      <p class="text-body-1">Rating</p>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <div class="stat-card pa-4 rounded-lg">
                      <v-icon size="48" color="primary" class="mb-2">mdi-calendar</v-icon>
                      <h3 class="text-h4 font-weight-bold mb-2 text-capitalize">
                        {{ seasonOrStatus }}
                      </h3>
                      <p class="text-body-1">{{ media.year }}</p>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Media, Credit } from '@/types/media'

export default defineComponent({
  name: 'MediaDetailHero',

  props: {
    type: {
      type: String as PropType<'anime' | 'manga'>,
      required: true,
    },
    media: {
      type: Object as PropType<Media>,
      required: true,
    },
    credits: {
      type: Array as PropType<Credit[]>,
      required: true,
    },
  },

  computed: {
    creditTitle(): string {
      return this.type === 'anime' ? 'Studio Spotlight' : 'Author Spotlight'
    },
    countLabel(): string {
      return this.type === 'anime' ? 'Episodes' : 'Chapters'
    },
    contentCount(): string {
      return this.type === 'anime'
        ? String(this.media.episodes || '?')
        : String(this.media.chapters || '?')
    },
    seasonOrStatus(): string {
      return this.type === 'anime' ? this.media.season || '' : this.media.status || ''
    },
    genres(): Array<{ id: number; name: string }> {
      return this.media.genres
    },
  },
})
</script>

<style scoped>
.hero-carousel {
  margin-bottom: 2rem;
}

.hero-overlay {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 100%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}

.poster-image {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
  transition: transform 0.3s ease;
}

.poster-image:hover {
  transform: scale(1.02);
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.gap-4 {
  gap: 1rem;
}

.gap-2 {
  gap: 0.5rem;
}

@media (max-width: 960px) {
  .hero-section {
    text-align: center;
  }

  .poster-image {
    margin: 0 auto;
    max-width: 300px;
  }
}
</style>
