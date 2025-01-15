<template>
  <v-card class="pa-12 text-center">
    <v-icon size="64" color="error" class="mb-4">mdi-alert-circle</v-icon>
    <h2 class="text-h5 text-error-darken-1 mb-2">{{ errorMessage }}</h2>
    <p class="text-body-1 text-grey mb-6">{{ errorDescription }}</p>
    <v-btn color="primary" to="/news" prepend-icon="mdi-view-list">Back to News</v-btn>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNewsStore } from '../../stores/news'

interface NewsErrorState {
  newsStore: ReturnType<typeof useNewsStore>
}

export default defineComponent({
  name: 'NewsError',

  props: {
    message: {
      type: String as () => string | null,
      required: false,
      default: null,
    },
    description: {
      type: String as () => string | null,
      required: false,
      default: null,
    },
  },

  data(): NewsErrorState {
    const store = useNewsStore()
    return {
      newsStore: store,
    }
  },

  computed: {
    errorMessage(): string {
      return this.message || this.newsStore.error || 'News not found'
    },
    errorDescription(): string {
      return (
        this.description ||
        'The news article you are looking for might have been removed or is temporarily unavailable.'
      )
    },
  },
})
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 16px;
  background: var(--v-surface-base);
}

.v-icon {
  opacity: 0.9;
}
</style>
