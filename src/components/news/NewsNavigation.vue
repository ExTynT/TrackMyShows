<!-- Navigácia medzi novinkami -->
<template>
  <div class="d-flex justify-space-between align-center mt-8">
    <!-- Tlačidlo pre predchádzajúcu novinku -->
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

    <!-- Tlačidlo pre nasledujúcu novinku -->
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
// Importy potrebných závislostí
import { defineComponent } from 'vue'
import { useNewsStore } from '../../stores/news'

// Rozhranie pre stav komponentu
interface NewsNavigationState {
  newsStore: ReturnType<typeof useNewsStore>
}

export default defineComponent({
  name: 'NewsNavigation',

  // Vlastnosti komponentu
  props: {
    // ID predchádzajúcej novinky
    previousNewsId: {
      type: Number as () => number | null | undefined,
      required: false,
      default: undefined,
    },
    // ID nasledujúcej novinky
    nextNewsId: {
      type: Number as () => number | null | undefined,
      required: false,
      default: undefined,
    },
  },

  // Inicializácia stavu
  data(): NewsNavigationState {
    const store = useNewsStore()
    return {
      newsStore: store,
    }
  },

  // Vypočítané vlastnosti
  computed: {
    // Stav načítavania
    loading(): boolean {
      return this.newsStore.loading
    },
    // Cesta k predchádzajúcej novinke
    previousNewsRoute(): string {
      return `/news/${this.previousNewsId}`
    },
    // Cesta k nasledujúcej novinke
    nextNewsRoute(): string {
      return `/news/${this.nextNewsId}`
    },
  },

  // Načítanie detailov noviniek po vytvorení komponentu
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
