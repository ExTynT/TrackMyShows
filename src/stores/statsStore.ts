import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStatsStore = defineStore('stats', () => {
  const currentlyWatching = ref(0)
  const episodesWatched = ref(0)
  const hoursWatched = ref(0)
  const meanScore = ref(0)

  return {
    currentlyWatching,
    episodesWatched,
    hoursWatched,
    meanScore,
  }
})
