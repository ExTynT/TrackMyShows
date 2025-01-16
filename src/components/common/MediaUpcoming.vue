<!-- Sekcia pre pripravované médiá -->
<template>
  <section class="py-8">
    <v-container>
      <!-- Nadpis sekcie -->
      <h2 class="text-h4 font-weight-bold mb-6">
        Upcoming {{ type === 'anime' ? 'Anime' : 'Manga' }}
      </h2>
      <!-- Mriežka s médiami -->
      <v-row>
        <v-col v-for="media in upcomingMedia" :key="media.id" cols="12" sm="6" md="4">
          <!-- Efekt pri prejdení myšou -->
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              class="h-100 upcoming-card"
              :elevation="isHovering ? 8 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              @click="$emit('navigate', media.id)"
            >
              <!-- Obrázok s titulkom -->
              <v-img
                :src="
                  media.image_url ||
                  'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/public/Images/placeholder.jpg'
                "
                height="200"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
                cover
              >
                <v-card-title class="text-white text-truncate">{{ media.title }}</v-card-title>
              </v-img>

              <!-- Detaily média -->
              <v-card-text>
                <!-- Krátky popis -->
                <p class="text-body-2 text-grey-darken-1 mb-3 synopsis">
                  {{ media.synopsis }}
                </p>

                <!-- Informácie o vydaní -->
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <v-chip color="primary" size="small" class="mr-2">
                      {{ type === 'anime' ? 'TV' : 'Manga' }}
                    </v-chip>
                    <span class="text-caption text-grey-darken-1">
                      {{ getReleaseDate(media) }}
                    </span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts">
// Importy potrebných závislostí
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import type { Anime } from '../../types/anime'
import type { Manga } from '../../types/manga'

export default defineComponent({
  name: 'MediaUpcoming',

  // Vlastnosti komponentu
  props: {
    // Typ média (anime/manga)
    type: {
      type: String as () => 'anime' | 'manga',
      required: true,
    },
    // Zoznam médií
    mediaList: {
      type: Array as PropType<Anime[] | Manga[]>,
      required: true,
    },
  },

  // Definícia emitovaných udalostí
  emits: ['navigate'],

  // Nastavenie komponentu
  setup(props) {
    // Kontrola typu média
    const isAnime = (media: Anime | Manga): media is Anime => {
      return props.type === 'anime'
    }

    // Filtrovanie pripravovaných médií
    const upcomingMedia = computed(() => {
      return props.mediaList
        .filter((media) => {
          if (isAnime(media)) {
            return media.status === 'upcoming' || media.year! >= new Date().getFullYear()
          }
          return media.status === 'hiatus'
        })
        .sort((a, b) => {
          if (isAnime(a) && isAnime(b)) {
            return (a.year || 0) - (b.year || 0)
          }
          return (b as Manga).year - (a as Manga).year
        })
        .slice(0, 3)
    })

    // Formátovanie dátumu vydania
    const getReleaseDate = (media: Anime | Manga) => {
      if (isAnime(media)) {
        return media.year ? `Coming in ${media.year}` : 'Release year unknown'
      }
      return `Coming in ${media.year}`
    }

    return {
      upcomingMedia,
      getReleaseDate,
    }
  },
})
</script>

<style scoped>
.upcoming-card {
  transition: transform 0.2s;
  cursor: pointer;
}

.upcoming-card.on-hover {
  transform: translateY(-4px);
}

.synopsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 4.5em;
}

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
</style>
