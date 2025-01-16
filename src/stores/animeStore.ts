import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'
import type { Genre, Studio, UserAnimeListItem, AnimeStatus, AnimeSeason } from '@/types/anime'

// Rozhranie pre anime dáta
export interface Anime {
  id: number
  title: string
  japanese_title?: string
  synopsis?: string
  image_url?: string
  cover_image_url?: string
  episodes: number
  status: AnimeStatus
  rating?: number
  season?: AnimeSeason
  year?: number
  genres?: Array<{
    genres: {
      id: number
      name: string
    }
  }>
  studios?: Array<{
    studios: {
      id: number
      name: string
      logo_url?: string
    }
  }>
  characters?: Array<{
    id: number
    name: string
    japanese_name?: string
    description?: string
    anime_id: number
  }>
  popularity?: number
}

export const useAnimeStore = defineStore('anime', () => {
  // Stavové premenné
  const animeList = ref<Anime[]>([])
  const currentAnime = ref<Anime | null>(null)
  const genres = ref<Genre[]>([])
  const studios = ref<Studio[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const userAnimeList = ref<UserAnimeListItem[]>([])

  // Gettery pre filtrovanie a zoradenie anime
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

  // Akcie pre prácu s databázou
  async function fetchAnimeList() {
    try {
      loading.value = true
      error.value = null

      // Načítanie zoznamu anime s ich žánrami a štúdiami
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

  // Načítanie detailov konkrétneho anime
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

  // Načítanie všetkých žánrov
  async function fetchGenres() {
    try {
      const { data, error: err } = await supabase.from('genres').select('*').order('name')

      if (err) throw err

      genres.value = data
    } catch (err) {
      console.error('Error fetching genres:', err)
    }
  }

  // Načítanie všetkých štúdií
  async function fetchStudios() {
    try {
      const { data, error: err } = await supabase.from('studios').select('*').order('name')

      if (err) throw err

      studios.value = data
    } catch (err) {
      console.error('Error fetching studios:', err)
    }
  }

  // Načítanie zoznamu anime používateľa
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

  // Aktualizácia stavu sledovania anime používateľom
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

      // Obnovenie zoznamu anime používateľa
      await fetchUserAnimeList(userId)
    } catch (err) {
      console.error('Error updating anime status:', err)
      throw err
    }
  }

  // Export stavových premenných a funkcií
  return {
    // Stavové premenné
    animeList,
    currentAnime,
    genres,
    studios,
    loading,
    error,
    userAnimeList,

    // Gettery
    airingAnime,
    upcomingAnime,
    popularAnime,
    topRatedAnime,

    // Akcie
    fetchAnimeList,
    fetchAnimeDetails,
    fetchGenres,
    fetchStudios,
    fetchUserAnimeList,
    updateUserAnimeStatus,
  }
})
