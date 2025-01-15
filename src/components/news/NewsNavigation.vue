<template>
  <div class="d-flex justify-space-between align-center mt-8">
    <v-btn
      v-if="previousNewsId"
      color="primary"
      variant="text"
      :to="previousNewsRoute"
      prepend-icon="mdi-chevron-left"
      :disabled="loading"
    >
      Previous
    </v-btn>
    <v-spacer v-else></v-spacer>

    <v-btn
      v-if="nextNewsId"
      color="primary"
      variant="text"
      :to="nextNewsRoute"
      append-icon="mdi-chevron-right"
      class="ml-auto"
      :disabled="loading"
    >
      Next
    </v-btn>
    <v-spacer v-else></v-spacer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNewsStore } from '../../stores/news'

interface NewsNavigationState {
  newsStore: ReturnType<typeof useNewsStore>
}

export default defineComponent({
  name: 'NewsNavigation',

  props: {
    previousNewsId: {
      type: Number as () => number | null | undefined,
      required: false,
      default: undefined,
    },
    nextNewsId: {
      type: Number as () => number | null | undefined,
      required: false,
      default: undefined,
    },
  },

  data(): NewsNavigationState {
    const store = useNewsStore()
    return {
      newsStore: store,
    }
  },

  computed: {
    loading(): boolean {
      return this.newsStore.loading
    },
    previousNewsRoute(): string {
      return `/news/${this.previousNewsId}`
    },
    nextNewsRoute(): string {
      return `/news/${this.nextNewsId}`
    },
  },

  async mounted() {
    if (this.previousNewsId) {
      await this.newsStore.fetchNewsDetail(this.previousNewsId.toString())
    }
    if (this.nextNewsId) {
      await this.newsStore.fetchNewsDetail(this.nextNewsId.toString())
    }
  },
})
</script>

<style scoped>
.v-btn {
  min-width: 100px;
}
</style>
