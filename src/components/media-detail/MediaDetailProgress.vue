<template>
  <v-card class="mb-6" elevation="2">
    <v-card-title class="text-h5 py-4 px-6 bg-primary text-white">
      <v-icon start class="me-2">mdi-bookmark</v-icon>
      Your Progress
    </v-card-title>
    <v-card-text class="pa-6">
      <v-select
        :model-value="modelValue.status"
        :items="statusItems"
        label="Status"
        class="mb-4"
        @update:model-value="updateStatus"
      ></v-select>
      <v-text-field
        :model-value="modelValue.progress"
        type="number"
        :max="maxProgress"
        min="0"
        :label="progressLabel"
        class="mb-4"
        @update:model-value="updateProgress"
      ></v-text-field>
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
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { UserAnimeStatus } from '@/types/anime'
import type { UserMangaStatus } from '@/types/manga'

interface ProgressModel {
  status: UserAnimeStatus | UserMangaStatus
  progress: number
}

export default defineComponent({
  name: 'MediaDetailProgress',

  props: {
    type: {
      type: String as PropType<'anime' | 'manga'>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<ProgressModel>,
      required: true,
    },
    maxProgress: {
      type: Number,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update', 'update:model-value'],

  computed: {
    statusItems(): string[] {
      return this.type === 'anime'
        ? ['watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch']
        : ['reading', 'completed', 'on_hold', 'dropped', 'plan_to_read']
    },
    progressLabel(): string {
      return this.type === 'anime' ? 'Episodes Watched' : 'Chapters Read'
    },
  },

  methods: {
    updateStatus(value: string) {
      this.$emit('update:model-value', {
        ...this.modelValue,
        status: value as UserAnimeStatus | UserMangaStatus,
      })
    },
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
