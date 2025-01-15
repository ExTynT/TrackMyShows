<template>
  <section class="py-8 bg-grey-darken-4">
    <v-container>
      <h2 class="text-h4 font-weight-bold mb-6">
        {{ title || `${type === 'anime' ? 'Anime' : 'Manga'} Reviews` }}
      </h2>
      <v-row>
        <v-col cols="12">
          <MediaReviews :type="type" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MediaReviews from '@/components/common/MediaReviews.vue'

export default defineComponent({
  name: 'MediaReviewsSection',

  components: {
    MediaReviews,
  },

  props: {
    type: {
      type: String as () => 'anime' | 'manga',
      required: true,
    },
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
