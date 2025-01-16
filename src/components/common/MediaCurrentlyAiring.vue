<!-- Sekcia pre aktuálne vysielané/publikované médiá -->
<template>
  <section class="py-8">
    <v-container>
      <!-- Nadpis sekcie -->
      <h2 class="text-h4 font-weight-bold mb-6">
        Currently {{ type === 'anime' ? 'Airing' : 'Publishing' }}
      </h2>
      <!-- Mriežka s médiami -->
      <v-row>
        <v-col v-for="media in currentlyAiringMedia" :key="media.id" cols="12" sm="6" md="4">
          <!-- Karta média -->
          <v-card class="h-100" @click="$emit('navigate', media.id)">
            <!-- Obrázok s titulkom -->
            <v-img
              :src="media.image_url"
              :alt="media.title"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
              height="200"
              cover
            >
              <v-card-title class="text-white">{{ media.title }}</v-card-title>
            </v-img>

            <!-- Detaily média -->
            <v-card-text>
              <!-- Hodnotenie -->
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

              <!-- Počet epizód/kapitol -->
              <p class="text-caption text-grey-darken-1">
                {{ type === 'anime' ? 'Episodes' : 'Chapters' }}:
                {{ getMediaCount(media) || 'Unknown' }}
              </p>
              <!-- Stav vysielania/publikovania -->
              <p class="text-caption text-grey-darken-1 mb-0">Status: {{ media.status }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { Anime } from '../../types/anime'
import type { Manga } from '../../types/manga'

export default {
  name: 'MediaCurrentlyAiring',

  props: {
    type: {
      type: String as PropType<'anime' | 'manga'>,
      required: true,
    },
    mediaList: {
      type: Array as PropType<Anime[] | Manga[]>,
      required: true,
    },
  },

  emits: ['navigate'],

  computed: {
    currentlyAiringMedia(): (Anime | Manga)[] {
      console.log(
        'MediaList:',
        this.mediaList.map((m: Anime | Manga) => ({ title: m.title, status: m.status })),
      )
      return this.mediaList
        .filter((media: Anime | Manga) => {
          if (this.type === 'anime') {
            return media.status === 'airing'
          }
          return media.status === 'ongoing'
        })
        .slice(0, 3)
    },
  },

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
.text-h4 {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.text-h4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--v-primary-base);
  border-radius: 2px;
}

.v-card {
  transition: transform 0.2s;
  cursor: pointer;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style>
