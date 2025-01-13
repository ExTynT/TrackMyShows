<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useMediaStore } from '@/stores/mediaStore'
import MediaDetail from '@/components/MediaDetail.vue'
import { computed } from 'vue'

const route = useRoute()
const store = useMediaStore()

const mediaType = computed(() => route.params.type as 'anime' | 'manga')
const mediaId = computed(() => Number(route.params.id))

const media = computed(() => {
  return store.getMediaById(mediaType.value, mediaId.value)
})
</script>

<template>
  <div v-if="media" class="media-view">
    <MediaDetail :media="media" />
  </div>
  <div v-else class="not-found">
    <h1>Not Found</h1>
    <p>Sorry, we couldn't find what you're looking for.</p>
    <router-link to="/" class="back-btn">Back to Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.back-btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 1rem;
  transition: transform 0.2s;
}

.back-btn:hover {
  transform: translateY(-2px);
}
</style>
