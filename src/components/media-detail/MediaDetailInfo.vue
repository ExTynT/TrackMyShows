<!-- Karta s detailnými informáciami -->
<template>
  <v-card class="mb-6" elevation="2">
    <!-- Nadpis karty -->
    <v-card-title class="text-h5 py-4 px-6 bg-primary text-white">
      <v-icon start class="me-2">mdi-information</v-icon>
      Details
    </v-card-title>
    <!-- Obsah karty -->
    <v-card-text class="pa-6">
      <v-row>
        <!-- Stav média -->
        <v-col cols="4" class="text-grey text-subtitle-1">Status</v-col>
        <v-col cols="8" class="text-subtitle-1">
          <v-chip :color="statusColor" label>
            {{ media.status }}
          </v-chip>
        </v-col>

        <!-- Počet epizód/kapitol -->
        <v-col cols="4" class="text-grey text-subtitle-1">{{ countLabel }}</v-col>
        <v-col cols="8" class="text-subtitle-1">
          {{ contentCount }}
        </v-col>

        <!-- Počet zväzkov (len pre mangu) -->
        <template v-if="type === 'manga' && media.volumes">
          <v-col cols="4" class="text-grey text-subtitle-1">Volumes</v-col>
          <v-col cols="8" class="text-subtitle-1">
            {{ media.volumes }}
          </v-col>
        </template>

        <!-- Sezóna a rok (len pre anime) -->
        <template v-if="type === 'anime' && media.season">
          <v-col cols="4" class="text-grey text-subtitle-1">Season</v-col>
          <v-col cols="8" class="text-subtitle-1 text-capitalize">
            {{ media.season }} {{ media.year }}
          </v-col>
        </template>

        <!-- Štúdiá/Autori -->
        <v-col cols="4" class="text-grey text-subtitle-1">{{ creditLabel }}</v-col>
        <v-col cols="8">
          <v-chip
            v-for="credit in credits"
            :key="credit.id"
            class="mr-2 mb-2"
            color="primary"
            variant="outlined"
          >
            <template v-if="type === 'anime' && credit.logo_url">
              <v-img :src="credit.logo_url" height="16" width="32" class="me-1" contain></v-img>
            </template>
            <v-icon v-else start>mdi-account</v-icon>
            {{ credit.name }}
          </v-chip>
        </v-col>

        <!-- Žánre -->
        <v-col cols="4" class="text-grey text-subtitle-1">Genres</v-col>
        <v-col cols="8">
          <v-chip v-for="genre in genres" :key="genre.id" class="mr-2 mb-2" variant="outlined">
            {{ genre.name }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
// Importy potrebných závislostí
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Media, Credit } from '@/types/media'

export default defineComponent({
  name: 'MediaDetailInfo',

  // Vlastnosti komponentu
  props: {
    // Typ média (anime/manga)
    type: {
      type: String as PropType<'anime' | 'manga'>,
      required: true,
    },
    // Údaje o médiu
    media: {
      type: Object as PropType<Media>,
      required: true,
    },
    // Zoznam tvorcov
    credits: {
      type: Array as PropType<Credit[]>,
      required: true,
    },
  },

  // Vypočítané vlastnosti
  computed: {
    // Text pre štúdiá/autorov
    creditLabel(): string {
      return this.type === 'anime' ? 'Studios' : 'Authors'
    },
    // Text pre počet epizód/kapitol
    countLabel(): string {
      return this.type === 'anime' ? 'Episodes' : 'Chapters'
    },
    // Počet epizód/kapitol
    contentCount(): string {
      return this.type === 'anime'
        ? String(this.media.episodes || 'Unknown')
        : String(this.media.chapters || 'Unknown')
    },
    // Zoznam žánrov
    genres(): Array<{ id: number; name: string }> {
      return this.media.genres
    },
    // Farba pre stav média
    statusColor(): string {
      const status = this.media.status.toLowerCase()
      if (this.type === 'anime') {
        switch (status) {
          case 'airing':
            return 'success'
          case 'upcoming':
            return 'info'
          case 'finished':
            return 'grey'
          default:
            return 'primary'
        }
      } else {
        switch (status) {
          case 'ongoing':
            return 'success'
          case 'hiatus':
            return 'warning'
          case 'completed':
            return 'grey'
          case 'cancelled':
            return 'error'
          default:
            return 'primary'
        }
      }
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

.v-chip {
  transition: all 0.2s ease;
}

.v-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

:deep(.text-grey) {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>
