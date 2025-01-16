import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

// Rozhranie pre novinku
export interface NewsItem {
  id: number
  title: string
  description: string
  date: string
  image_url: string
  link_slug: string
  full_content: string
  previous_id: number | null
  next_id: number | null
  author: string
}

// Store pre správu noviniek
export const useNewsStore = defineStore('news', {
  // Stavové premenné
  state: () => ({
    news: [] as NewsItem[],
    currentNews: null as NewsItem | null,
    loading: false,
    error: null as string | null,
  }),

  // Akcie pre prácu s novinkami
  actions: {
    // Načítanie všetkých noviniek
    async fetchNews() {
      this.loading = true
      this.error = null
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('date', { ascending: false })

        if (error) throw error
        this.news = data
      } catch (err) {
        console.error('News error:', err)
        this.error = 'Failed to fetch news'
      } finally {
        this.loading = false
      }
    },

    // Načítanie detailu konkrétnej novinky
    async fetchNewsDetail(slug: string) {
      this.loading = true
      this.error = null
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('link_slug', slug)
          .single()

        if (error) throw error
        this.currentNews = data
      } catch (err) {
        console.error('News detail error:', err)
        this.error = 'Failed to fetch news detail'
        this.currentNews = null
      } finally {
        this.loading = false
      }
    },

    // Pridanie novej novinky
    async addNews(newsItem: Omit<NewsItem, 'id'>) {
      const { data, error } = await supabase.from('news').insert([newsItem]).select()

      if (error) throw error
      return data[0]
    },

    // Aktualizácia existujúcej novinky
    async updateNews(id: number, updates: Partial<NewsItem>) {
      const { data, error } = await supabase.from('news').update(updates).eq('id', id).select()

      if (error) throw error
      return data[0]
    },

    // Odstránenie novinky
    async removeNews(id: number) {
      const { error } = await supabase.from('news').delete().eq('id', id)

      if (error) throw error
    },
  },
})
