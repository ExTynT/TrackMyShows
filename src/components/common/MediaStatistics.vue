<template>
  <v-container>
    <v-row>
      <v-col v-for="stat in statistics" :key="stat.label" cols="12" sm="6" md="3">
        <v-card class="text-center pa-4" variant="outlined">
          <div class="text-h4 font-weight-bold mb-2">{{ stat.value }}</div>
          <div class="text-subtitle-1">{{ stat.label }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Statistic } from '@/types/statistics'

export default defineComponent({
  name: 'MediaStatistics',

  props: {
    type: {
      type: String as () => 'anime' | 'manga',
      required: true,
      validator: (value: string) => ['anime', 'manga'].includes(value),
    },
    totalItems: {
      type: Number,
      required: true,
    },
    totalEpisodesOrChapters: {
      type: Number,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    completionRate: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    statistics(): Statistic[] {
      return [
        {
          label: this.type === 'anime' ? 'Total Anime' : 'Total Manga',
          value: this.totalItems,
        },
        {
          label: this.type === 'anime' ? 'Episodes Watched' : 'Chapters Read',
          value: this.totalEpisodesOrChapters,
        },
        {
          label: 'Average Rating',
          value: this.averageRating.toFixed(1),
        },
        {
          label: 'Completion Rate',
          value: `${this.completionRate.toFixed(1)}%`,
        },
      ]
    },
  },
})
</script>
