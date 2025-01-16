import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { Manga, UserMangaStatus, UserMangaListItem, MangaStatus } from '@/types/manga'

// Rozhranie pre prepojenie mangy a žánrov
interface MangaGenreRelation {
  manga_id: number
  manga_genres: {
    id: number
    name: string
  }
}

// Rozhranie pre prepojenie mangy a autorov
interface MangaAuthorRelation {
  manga_id: number
  manga_authors: {
    id: number
    name: string
    japanese_name?: string
    biography?: string
    image_url?: string
    role: string
  }
}

// Rozhranie pre nespracované dáta mangy z databázy
interface RawMangaData {
  id: number
  title: string
  japanese_title?: string
  synopsis: string
  chapters: number
  volumes: number
  status: MangaStatus
  year: number
  image_url: string
  cover_image_url?: string
  publishing_start?: string
  publishing_end?: string
  rating?: number
  popularity?: number
  manga_genre_relations: MangaGenreRelation[]
  manga_author_relations: MangaAuthorRelation[]
  manga_characters?: Manga['characters']
}

// Store pre správu mangy
export const useMangaStore = defineStore('manga', () => {
  // Stavové premenné
  const mangaList = ref<Manga[]>([])
  const currentManga = ref<Manga | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const userMangaList = ref<UserMangaListItem[]>([])

  // Načítanie zoznamu všetkých máng
  async function fetchMangaList() {
    try {
      loading.value = true
      error.value = null

      console.log('Fetching manga list...')

      const { data: mangaData, error: mangaErr } = await supabase
        .from('manga')
        .select('*')
        .order('title')

      if (mangaErr) {
        console.error('Error fetching manga:', mangaErr)
        throw mangaErr
      }

      console.log('Basic manga data:', mangaData)

      const { data: genreData, error: genreErr } = await supabase.from('manga_genre_relations') // Destrukturovanie dát
        .select(`
          manga_id,
          manga_genres(*)
        `)

      if (genreErr) {
        console.error('Error fetching genres:', genreErr)
        throw genreErr
      }

      console.log('Genre relations:', genreData)

      const { data: authorData, error: authorErr } = await supabase.from('manga_author_relations')
        .select(`
          manga_id,
          manga_authors(*)
        `)

      if (authorErr) {
        console.error('Error fetching authors:', authorErr)
        throw authorErr
      }

      console.log('Author relations:', authorData)

      mangaList.value = mangaData.map((manga) => {
        const mangaGenres = genreData
          .filter((g) => g.manga_id === manga.id)
          .map((g) => g.manga_genres)

        const mangaAuthors = authorData
          .filter((a) => a.manga_id === manga.id)
          .map((a) => a.manga_authors)

        return {
          ...manga,
          genres: mangaGenres,
          authors: mangaAuthors,
        }
      }) as Manga[]

      console.log('Final manga list:', mangaList.value)
    } catch (err) {
      error.value = (err as Error).message
      console.error('Error in fetchMangaList:', err)
    } finally {
      loading.value = false
    }
  }

  // Načítanie detailu konkrétnej mangy
  async function fetchMangaDetail(id: number) {
    try {
      loading.value = true
      error.value = null

      const { data, error: err } = await supabase
        .from('manga')
        .select(
          `
          *,
          manga_genre_relations(
            manga_genres(*)
          ),
          manga_author_relations(
            manga_authors(*)
          ),
          manga_characters(
            id,
            name,
            japanese_name,
            image_url,
            description
          )
        `,
        )
        .eq('id', id)
        .single()

      if (err) throw err

      if (data) {
        const mangaData = data as RawMangaData
        currentManga.value = {
          ...mangaData,
          genres: mangaData.manga_genre_relations?.map((g) => g.manga_genres) || [],
          authors: mangaData.manga_author_relations?.map((a) => a.manga_authors) || [],
          characters: mangaData.manga_characters || [],
        } as Manga
      }
    } catch (err) {
      error.value = (err as Error).message
      console.error('Error fetching manga details:', err)
    } finally {
      loading.value = false
    }
  }

  // Načítanie zoznamu máng používateľa
  async function fetchUserMangaList(userId: string) {
    try {
      const { data, error: err } = await supabase
        .from('user_manga_list')
        .select(
          `
          *,
          manga:manga_id(*)
        `,
        )
        .eq('user_id', userId)

      if (err) throw err

      userMangaList.value = data
    } catch (err) {
      console.error('Error fetching user manga list:', err)
    }
  }

  // Aktualizácia stavu čítania mangy používateľom
  async function updateUserMangaStatus(
    mangaId: number,
    status: UserMangaStatus,
    chaptersRead: number = 0,
  ) {
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id
      if (!userId) throw new Error('User not authenticated')

      const { error: err } = await supabase.from('user_manga_list').upsert({
        user_id: userId,
        manga_id: mangaId,
        status,
        chapters_read: chaptersRead,
        updated_at: new Date().toISOString(),
      })

      if (err) throw err

      // Refresh user's manga list
      await fetchUserMangaList(userId)
    } catch (err) {
      console.error('Error updating manga status:', err)
      throw err
    }
  }

  // Export stavových premenných a funkcií
  return {
    mangaList,
    currentManga,
    loading,
    error,
    userMangaList,
    fetchMangaList,
    fetchMangaDetail,
    fetchUserMangaList,
    updateUserMangaStatus,
  }
})
