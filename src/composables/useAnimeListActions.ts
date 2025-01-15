import { useUserAnimeListStore } from '@/stores/userAnimeListStore'
import type { UserAnimeStatus } from '@/types/anime'

export function useAnimeListActions() {
  const userAnimeListStore = useUserAnimeListStore()

  const updateStatus = async (animeId: number, status: UserAnimeStatus) => {
    await userAnimeListStore.updateListItem(animeId, { status })
  }

  const updateRating = async (animeId: number, rating: number) => {
    const formattedRating = parseFloat(rating.toFixed(1))
    await userAnimeListStore.updateListItem(animeId, { rating: formattedRating })
  }

  const updateNotes = async (animeId: number, notes: string) => {
    await userAnimeListStore.updateListItem(animeId, { notes })
  }

  const updateEpisodes = async (animeId: number, episodes: number) => {
    await userAnimeListStore.updateListItem(animeId, { episodes_watched: episodes })
  }

  const toggleFavorite = async (animeId: number) => {
    await userAnimeListStore.toggleFavorite(animeId)
  }

  const incrementRewatch = async (animeId: number) => {
    await userAnimeListStore.incrementRewatch(animeId)
  }

  const removeFromList = async (animeId: number) => {
    await userAnimeListStore.removeFromList(animeId)
  }

  return {
    updateStatus,
    updateRating,
    updateNotes,
    updateEpisodes,
    toggleFavorite,
    incrementRewatch,
    removeFromList,
  }
}
