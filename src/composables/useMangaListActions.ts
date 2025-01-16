import { useUserMangaListStore } from '@/stores/userMangaListStore'
import type { UserMangaStatus } from '@/types/manga'
import { supabase } from '@/supabase'

// Composable pre akcie so zoznamom mangy
export function useMangaListActions() {
  const store = useUserMangaListStore()

  // Aktualizácia stavu čítania
  async function updateStatus(mangaId: number, status: UserMangaStatus) {
    const { error } = await supabase
      .from('user_manga_list')
      .update({ status })
      .eq('manga_id', mangaId)
    if (error) throw error
    await store.fetchUserList()
  }

  // Aktualizácia hodnotenia
  async function updateRating(mangaId: number, rating: number) {
    const { error } = await supabase
      .from('user_manga_list')
      .update({ rating: Number(rating.toFixed(1)) })
      .eq('manga_id', mangaId)
    if (error) throw error
    await store.fetchUserList()
  }

  // Aktualizácia poznámok
  async function updateNotes(mangaId: number, notes: string) {
    const { error } = await supabase
      .from('user_manga_list')
      .update({ notes })
      .eq('manga_id', mangaId)
    if (error) throw error
    await store.fetchUserList()
  }

  // Aktualizácia počtu prečítaných kapitol
  async function updateChapters(mangaId: number, chaptersRead: number) {
    const { error } = await supabase
      .from('user_manga_list')
      .update({ chapters_read: chaptersRead })
      .eq('manga_id', mangaId)
    if (error) throw error
    await store.fetchUserList()
  }

  // Prepnutie obľúbeného stavu
  async function toggleFavorite(mangaId: number) {
    const item = store.list.find((i) => i.manga_id === mangaId)
    if (!item) return

    const { error } = await supabase
      .from('user_manga_list')
      .update({ favorite: !item.favorite })
      .eq('manga_id', mangaId)
    if (error) throw error
    await store.fetchUserList()
  }

  // Odstránenie mangy zo zoznamu
  async function removeFromList(mangaId: number) {
    const { error } = await supabase.from('user_manga_list').delete().eq('manga_id', mangaId)
    if (error) throw error
    await store.fetchUserList()
  }

  // Export funkcií pre prácu so zoznamom
  return {
    updateStatus,
    updateRating,
    updateNotes,
    updateChapters,
    toggleFavorite,
    removeFromList,
  }
}
