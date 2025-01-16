import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import type { UserAnimeStatus, UserAnimeListItem } from '@/types/anime'

// Rozhranie pre stav zoznamu anime
interface State {
  list: UserAnimeListItem[]
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

// Store pre správu zoznamu anime používateľa
export const useUserAnimeListStore = defineStore('userAnimeList', () => {
  // Základný stav
  const state = ref<State>({
    list: [],
    loading: false,
    error: null,
    lastUpdated: null,
  })

  // Filtrované zoznamy podľa stavu sledovania
  const watching = computed(() => state.value.list.filter((item) => item.status === 'watching'))
  const completed = computed(() => state.value.list.filter((item) => item.status === 'completed'))
  const onHold = computed(() => state.value.list.filter((item) => item.status === 'on_hold'))
  const planToWatch = computed(() =>
    state.value.list.filter((item) => item.status === 'plan_to_watch'),
  )
  const dropped = computed(() => state.value.list.filter((item) => item.status === 'dropped'))
  const favorites = computed(() => state.value.list.filter((item) => item.favorite))

  // Štatistiky sledovania
  const statistics = computed(() => ({
    totalAnime: state.value.list.length,
    totalEpisodes: state.value.list.reduce((sum, item) => sum + item.episodes_watched, 0),
    averageRating: calculateAverageRating(state.value.list),
    completionRate: calculateCompletionRate(state.value.list),
    totalRewatches: state.value.list.reduce((sum, item) => sum + item.rewatch_count, 0),
  }))

  // Pomocné funkcie pre výpočet štatistík
  function calculateAverageRating(list: UserAnimeListItem[]): number {
    const ratedAnime = list.filter((item) => item.rating !== undefined)
    if (ratedAnime.length === 0) return 0
    const sum = ratedAnime.reduce((total, item) => total + (item.rating || 0), 0)
    return Number((sum / ratedAnime.length).toFixed(2))
  }

  function calculateCompletionRate(list: UserAnimeListItem[]): number {
    const completedAnime = list.filter((item) => item.status === 'completed').length
    return list.length ? Number(((completedAnime / list.length) * 100).toFixed(2)) : 0
  }

  // Načítanie zoznamu anime používateľa
  async function fetchUserList() {
    try {
      state.value.loading = true
      state.value.error = null

      const { data, error: err } = await supabase
        .from('user_anime_list')
        .select(
          `
          *,
          anime:anime_id (
            id,
            title,
            image_url,
            episodes,
            status
          )
        `,
        )
        .order('updated_at', { ascending: false })

      if (err) throw err
      state.value.list = data as UserAnimeListItem[]
      state.value.lastUpdated = new Date()
    } catch (err) {
      state.value.error = (err as Error).message
      console.error('Error fetching user list:', err)
    } finally {
      state.value.loading = false
    }
  }

  // Pridanie nového anime do zoznamu
  async function addToList(
    animeId: number,
    status: UserAnimeStatus = 'plan_to_watch',
    episodesWatched = 0,
    rating?: number,
    notes?: string,
  ) {
    try {
      state.value.loading = true
      state.value.error = null

      const newItem = {
        anime_id: animeId,
        status,
        episodes_watched: episodesWatched,
        rating,
        notes,
        rewatch_count: 0,
        favorite: false,
        start_date: status === 'watching' ? new Date().toISOString() : null,
      }

      const { error: err } = await supabase.from('user_anime_list').insert(newItem)

      if (err) throw err
      await fetchUserList()
    } catch (err) {
      state.value.error = (err as Error).message
      console.error('Error adding to list:', err)
    } finally {
      state.value.loading = false
    }
  }

  // Aktualizácia položky v zozname
  async function updateListItem(
    animeId: number,
    updates: Partial<Omit<UserAnimeListItem, 'id' | 'user_id' | 'anime_id' | 'anime'>>,
  ) {
    try {
      state.value.loading = true
      state.value.error = null

      // Handle status changes
      if (updates.status) {
        if (updates.status === 'completed') {
          updates.finish_date = new Date().toISOString()
        } else if (
          updates.status === 'watching' &&
          !state.value.list.find((item) => item.anime_id === animeId)?.start_date
        ) {
          updates.start_date = new Date().toISOString()
        }
      }

      const { error: err } = await supabase
        .from('user_anime_list')
        .update(updates)
        .eq('anime_id', animeId)

      if (err) throw err
      await fetchUserList()
    } catch (err) {
      state.value.error = (err as Error).message
      console.error('Error updating list item:', err)
    } finally {
      state.value.loading = false
    }
  }

  // Prepnutie obľúbeného stavu anime
  async function toggleFavorite(animeId: number) {
    const item = state.value.list.find((i) => i.anime_id === animeId)
    if (item) {
      await updateListItem(animeId, { favorite: !item.favorite })
    }
  }

  // Zvýšenie počtu opakovaného sledovania
  async function incrementRewatch(animeId: number) {
    const item = state.value.list.find((i) => i.anime_id === animeId)
    if (item) {
      await updateListItem(animeId, { rewatch_count: (item.rewatch_count || 0) + 1 })
    }
  }

  // Odstránenie anime zo zoznamu
  async function removeFromList(animeId: number) {
    try {
      state.value.loading = true
      state.value.error = null

      const { error: err } = await supabase.from('user_anime_list').delete().eq('anime_id', animeId)

      if (err) throw err
      state.value.list = state.value.list.filter((item) => item.anime_id !== animeId)
    } catch (err) {
      state.value.error = (err as Error).message
      console.error('Error removing from list:', err)
    } finally {
      state.value.loading = false
    }
  }

  // Export stavových premenných a funkcií
  return {
    // Stavové premenné
    list: computed(() => state.value.list),
    loading: computed(() => state.value.loading),
    error: computed(() => state.value.error),
    lastUpdated: computed(() => state.value.lastUpdated),

    // Filtrované zoznamy
    watching,
    completed,
    onHold,
    planToWatch,
    dropped,
    favorites,
    statistics,

    // Akcie
    fetchUserList,
    addToList,
    updateListItem,
    toggleFavorite,
    incrementRewatch,
    removeFromList,
  }
})
