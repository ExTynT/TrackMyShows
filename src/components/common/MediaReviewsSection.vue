<!-- Sekcia pre zobrazenie recenzií médií -->
<template>
  <section class="py-8 bg-grey-darken-4">
    <v-container>
      <!-- Nadpis sekcie -->
      <h2 class="text-h4 font-weight-bold mb-6">
        {{ title || `${type === 'anime' ? 'Anime' : 'Manga'} Reviews` }}
      </h2>
      <!-- Komponent pre recenzie -->
      <v-row>
        <v-col cols="12">
          <MediaReviews :type="type" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts">
// Importy potrebných závislostí
import { defineComponent } from 'vue'
import MediaReviews from '@/components/common/MediaReviews.vue'

export default defineComponent({
  name: 'MediaReviewsSection',

  // Registrácia komponentov
  components: {
    MediaReviews,
  },

  // Vlastnosti komponentu
  props: {
    // Typ média (anime/manga)
    type: {
      type: String as () => 'anime' | 'manga',
      required: true,
    },
    // Voliteľný vlastný nadpis
    title: {
      type: String,
      default: undefined,
    },
  },
})
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
</style>
