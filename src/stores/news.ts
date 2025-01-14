import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

export interface NewsItem {
  id: number
  title: string
  description: string
  date: string
  image_url: string
  link_slug: string
  full_content: string
}

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [] as NewsItem[],
    currentNews: null as NewsItem | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
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

    async addNews(newsItem: Omit<NewsItem, 'id'>) {
      const { data, error } = await supabase.from('news').insert([newsItem]).select()

      if (error) throw error
      return data[0]
    },

    async updateNews(id: number, updates: Partial<NewsItem>) {
      const { data, error } = await supabase.from('news').update(updates).eq('id', id).select()

      if (error) throw error
      return data[0]
    },

    async removeNews(id: number) {
      const { error } = await supabase.from('news').delete().eq('id', id)

      if (error) throw error
    },
  },
})
