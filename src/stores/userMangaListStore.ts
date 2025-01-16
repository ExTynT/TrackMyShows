import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'
import type { UserMangaListItem, UserMangaStatus } from '@/types/manga'

// Store pre správu zoznamu mangy používateľa
export const useUserMangaListStore = defineStore('userMangaList', () => {
  // Stavové premenné
  const list = ref<UserMangaListItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastUpdated = ref<Date | null>(null)

  // Pridanie novej mangy do zoznamu
  async function addToList(mangaId: number, status: UserMangaStatus, chaptersRead: number = 0) {
    loading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.from('user_manga_list').insert({
        manga_id: mangaId,
        status,
        chapters_read: chaptersRead,
        favorite: false,
      })
      if (err) throw err
      await fetchUserList()
    } catch (err) {
      error.value = (err as Error).message
      console.error('Error adding manga to list:', err)
    } finally {
      loading.value = false
    }
  }

  // Načítanie zoznamu mangy používateľa
  async function fetchUserList() {
    loading.value = true
    error.value = null
    try {
      const { data: mangaList, error: err } = await supabase
        .from('user_manga_list')
        .select(
          `
          *,
          manga:manga_id(
            id,
            title,
            synopsis,
            chapters,
            volumes,
            status,
            year,
            image_url,
            manga_genre_relations(
              manga_genres(
                id,
                name
              )
            ),
            manga_author_relations(
              manga_authors(
                id,
                name,
                japanese_name
              )
            )
          )
        `,
        )
        .order('updated_at', { ascending: false })

      if (err) throw err
      console.log('Fetched manga list:', mangaList)
      list.value = mangaList as UserMangaListItem[]
      lastUpdated.value = new Date()
    } catch (err) {
      error.value = (err as Error).message
      console.error('Error fetching manga list:', err)
    } finally {
      loading.value = false
    }
  }

  // Export stavových premenných a funkcií
  return {
    list,
    loading,
    error,
    lastUpdated,
    fetchUserList,
    addToList,
  }
})
