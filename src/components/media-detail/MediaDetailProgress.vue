<!-- Karta pre sledovanie progressu -->
<template>
  <v-card class="mb-6" elevation="2">
    <!-- Nadpis karty -->
    <v-card-title class="text-h5 py-4 px-6 bg-primary text-white">
      <v-icon start class="me-2">mdi-bookmark</v-icon>
      Your Progress
    </v-card-title>
    <!-- Obsah karty -->
    <v-card-text class="pa-6">
      <!-- Výber stavu sledovania -->
      <v-select
        :model-value="modelValue.status"
        :items="statusItems"
        label="Status"
        class="mb-4"
        @update:model-value="updateStatus"
      ></v-select>
      <!-- Počet pozretých epizód/prečítaných kapitol -->
      <v-text-field
        :model-value="modelValue.progress"
        type="number"
        :max="maxProgress"
        min="0"
        :label="progressLabel"
        class="mb-4"
        @update:model-value="updateProgress"
      ></v-text-field>
      <!-- Tlačidlo na aktualizáciu -->
      <v-btn
        block
        color="primary"
        :loading="loading"
        @click="$emit('update')"
        class="text-capitalize"
      >
        Update Progress
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
// Importy potrebných závislostí
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { UserAnimeStatus } from '@/types/anime'
import type { UserMangaStatus } from '@/types/manga'

// Rozhranie pre model progressu
interface ProgressModel {
  status: UserAnimeStatus | UserMangaStatus
  progress: number
}

export default defineComponent({
  name: 'MediaDetailProgress',

  // Vlastnosti komponenty
  props: {
    // Typ média (anime/manga)
    type: {
      type: String as PropType<'anime' | 'manga'>,
      required: true,
    },
    // Model pre progress
    modelValue: {
      type: Object as PropType<ProgressModel>,
      required: true,
    },
    // Maximálny progress
    maxProgress: {
      type: Number,
      required: true,
    },
    // Indikátor načítavania
    loading: {
      type: Boolean,
      default: false,
    },
  },

  // Definícia emitovaných udalostí
  emits: ['update', 'update:model-value'],

  // Vypočítané vlastnosti
  computed: {
    // Dostupné stavy sledovania
    statusItems(): string[] {
      return this.type === 'anime'
        ? ['watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch']
        : ['reading', 'completed', 'on_hold', 'dropped', 'plan_to_read']
    },
    // Text pre progress
    progressLabel(): string {
      return this.type === 'anime' ? 'Episodes Watched' : 'Chapters Read'
    },
  },

  // Metódy komponentu
  methods: {
    // Aktualizácia stavu sledovania
    updateStatus(value: string) {
      this.$emit('update:model-value', {
        ...this.modelValue,
        status: value as UserAnimeStatus | UserMangaStatus,
      })
    },
    // Aktualizácia progressu
    updateProgress(value: string) {
      this.$emit('update:model-value', {
        ...this.modelValue,
        progress: Number(value),
      })
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

:deep(.v-field__input) {
  color: white !important;
}

:deep(.v-label) {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>
