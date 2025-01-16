import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

// Rozhranie pre blogový príspevok
export interface BlogPost {
  id: number
  title: string
  content: string
  full_content: string
  author: string
  date: string
  image_url?: string
  category: 'blog' | 'review'
  rating?: number
  created_at: string
  updated_at: string
}

export const useBlogStore = defineStore('blog', {
  // Stavové premenné
  state: () => ({
    posts: [] as BlogPost[],
    currentPost: null as BlogPost | null,
    loading: false,
    error: null as string | null,
  }),

  // Gettery pre filtrovanie príspevkov
  getters: {
    blogs: (state) => state.posts.filter((post) => post.category === 'blog'),
    reviews: (state) => state.posts.filter((post) => post.category === 'review'),
  },

  // Akcie pre prácu s databázou
  actions: {
    // Načítanie všetkých príspevkov
    async fetchPosts() {
      this.loading = true
      this.error = null
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false })

        if (error) throw error
        this.posts = data
      } catch (err) {
        console.error('Blog error:', err)
        this.error = 'Failed to fetch blog posts'
      } finally {
        this.loading = false
      }
    },

    // Načítanie detailu príspevku
    async fetchPostDetail(id: number) {
      this.loading = true
      this.error = null
      try {
        const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single()

        if (error) throw error
        this.currentPost = data
      } catch (err) {
        console.error('Blog detail error:', err)
        this.error = 'Failed to fetch blog post'
        this.currentPost = null
      } finally {
        this.loading = false
      }
    },

    // Pridanie nového príspevku
    async addPost(post: Omit<BlogPost, 'id'>) {
      const { data, error } = await supabase.from('blog_posts').insert([post]).select()

      if (error) throw error
      return data[0]
    },

    // Aktualizácia existujúceho príspevku
    async updatePost(id: number, updates: Partial<BlogPost>) {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      return data[0]
    },

    // Odstránenie príspevku
    async removePost(id: number) {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id)

      if (error) throw error
    },
  },
})
