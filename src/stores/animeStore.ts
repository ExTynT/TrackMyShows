import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'
import type { Anime, Genre, Studio, UserAnimeListItem } from '@/types/anime'

export const useAnimeStore = defineStore('anime', () => {
  // State
  const animeList = ref<Anime[]>([])
  const currentAnime = ref<Anime | null>(null)
  const genres = ref<Genre[]>([])
  const studios = ref<Studio[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const userAnimeList = ref<UserAnimeListItem[]>([])

  // Getters
  const airingAnime = computed(() => animeList.value.filter((anime) => anime.status === 'airing'))

  const upcomingAnime = computed(() =>
    animeList.value.filter((anime) => anime.status === 'upcoming'),
  )

  const popularAnime = computed(() =>
    [...animeList.value].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)).slice(0, 10),
  )

  const topRatedAnime = computed(() =>
    [...animeList.value]
      .filter((anime) => anime.rating !== null && !anime.title.includes('Mashle'))
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 10),
  )

  // Actions
  async function fetchAnimeList() {
    try {
      loading.value = true
      error.value = null

      const { data, error: err } = await supabase
        .from('anime')
        .select(
          `
          *,
          genres:anime_genres(genres(*)),
          studios:anime_studios(studios(*))
        `,
        )
        .order('popularity', { ascending: false })

      if (err) throw err

      console.log('Anime data:', data)
      animeList.value = data as Anime[]
    } catch (err) {
      error.value = (err as Error).message
      console.error('Error fetching anime list:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchAnimeDetails(id: number) {
    try {
      loading.value = true
      error.value = null

      const { data, error: err } = await supabase
        .from('anime')
        .select(
          `
          *,
          genres:anime_genres(genres(*)),
          studios:anime_studios(studios(*)),
          characters(*)
        `,
        )
        .eq('id', id)
        .single()

      if (err) throw err

      currentAnime.value = data as Anime
    } catch (err) {
      error.value = (err as Error).message
      console.error('Error fetching anime details:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchGenres() {
    try {
      const { data, error: err } = await supabase.from('genres').select('*').order('name')

      if (err) throw err

      genres.value = data
    } catch (err) {
      console.error('Error fetching genres:', err)
    }
  }

  async function fetchStudios() {
    try {
      const { data, error: err } = await supabase.from('studios').select('*').order('name')

      if (err) throw err

      studios.value = data
    } catch (err) {
      console.error('Error fetching studios:', err)
    }
  }

  async function fetchUserAnimeList(userId: string) {
    try {
      const { data, error: err } = await supabase
        .from('user_anime_list')
        .select(
          `
          *,
          anime:anime(*)
        `,
        )
        .eq('user_id', userId)

      if (err) throw err

      userAnimeList.value = data
    } catch (err) {
      console.error('Error fetching user anime list:', err)
    }
  }

  async function updateUserAnimeStatus(
    animeId: number,
    status: UserAnimeListItem['status'],
    episodesWatched: number = 0,
  ) {
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id
      if (!userId) throw new Error('User not authenticated')

      const { error: err } = await supabase.from('user_anime_list').upsert({
        user_id: userId,
        anime_id: animeId,
        status,
        episodes_watched: episodesWatched,
        updated_at: new Date().toISOString(),
      })

      if (err) throw err

      // Refresh user's anime list
      await fetchUserAnimeList(userId)
    } catch (err) {
      console.error('Error updating anime status:', err)
      throw err
    }
  }

  return {
    // State
    animeList,
    currentAnime,
    genres,
    studios,
    loading,
    error,
    userAnimeList,

    // Getters
    airingAnime,
    upcomingAnime,
    popularAnime,
    topRatedAnime,

    // Actions
    fetchAnimeList,
    fetchAnimeDetails,
    fetchGenres,
    fetchStudios,
    fetchUserAnimeList,
    updateUserAnimeStatus,
  }
})
