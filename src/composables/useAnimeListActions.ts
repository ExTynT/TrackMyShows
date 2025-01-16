import { useUserAnimeListStore } from '@/stores/userAnimeListStore'
import type { UserAnimeStatus } from '@/types/anime'

// Composable pre akcie so zoznamom anime
export function useAnimeListActions() {
  const userAnimeListStore = useUserAnimeListStore()

  // Aktualizácia stavu sledovania
  const updateStatus = async (animeId: number, status: UserAnimeStatus) => {
    await userAnimeListStore.updateListItem(animeId, { status })
  }

  // Aktualizácia hodnotenia
  const updateRating = async (animeId: number, rating: number) => {
    const formattedRating = parseFloat(rating.toFixed(1))
    await userAnimeListStore.updateListItem(animeId, { rating: formattedRating })
  }

  // Aktualizácia poznámok
  const updateNotes = async (animeId: number, notes: string) => {
    await userAnimeListStore.updateListItem(animeId, { notes })
  }

  // Aktualizácia počtu pozretých epizód
  const updateEpisodes = async (animeId: number, episodes: number) => {
    await userAnimeListStore.updateListItem(animeId, { episodes_watched: episodes })
  }

  // Prepnutie obľúbeného stavu
  const toggleFavorite = async (animeId: number) => {
    await userAnimeListStore.toggleFavorite(animeId)
  }

  // Zvýšenie počtu opakovaného sledovania
  const incrementRewatch = async (animeId: number) => {
    await userAnimeListStore.incrementRewatch(animeId)
  }

  // Odstránenie anime zo zoznamu
  const removeFromList = async (animeId: number) => {
    await userAnimeListStore.removeFromList(animeId)
  }

  // Export funkcií pre prácu so zoznamom
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
