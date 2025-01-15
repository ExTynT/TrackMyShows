import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

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
}

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [] as BlogPost[],
    currentPost: null as BlogPost | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    blogs: (state) => state.posts.filter((post) => post.category === 'blog'),
    reviews: (state) => state.posts.filter((post) => post.category === 'review'),
  },

  actions: {
    async fetchPosts() {
      this.loading = true
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false })

        if (error) throw error
        this.posts = data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch posts'
      } finally {
        this.loading = false
      }
    },

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

    async addPost(post: Omit<BlogPost, 'id'>) {
      try {
        const { data, error } = await supabase.from('blog_posts').insert(post).select().single()

        if (error) throw error
        this.posts.unshift(data)
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to add post'
        throw err
      }
    },

    async updatePost(id: number, updates: Partial<BlogPost>) {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .update(updates)
          .eq('id', id)
          .select()
          .single()

        if (error) throw error
        const index = this.posts.findIndex((post) => post.id === id)
        if (index !== -1) {
          this.posts[index] = data
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to update post'
        throw err
      }
    },

    async removePost(id: number) {
      try {
        const { error } = await supabase.from('blog_posts').delete().eq('id', id)

        if (error) throw error
        const index = this.posts.findIndex((post) => post.id === id)
        if (index !== -1) {
          this.posts.splice(index, 1)
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to remove post'
        throw err
      }
    },
  },
})
