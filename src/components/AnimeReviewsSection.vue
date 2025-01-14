<template>
  <section class="py-8 bg-grey-darken-4">
    <v-container>
      <h2 class="text-h4 font-weight-bold mb-6">{{ title }}</h2>
      <v-row>
        <v-col cols="12">
          <AnimeReviews />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import AnimeReviews from '@/components/AnimeReviews.vue'

defineProps<{
  title?: string
}>()
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
