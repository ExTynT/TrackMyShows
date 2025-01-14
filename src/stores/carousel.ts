import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

interface CarouselSlide {
  id: number
  title: string
  description: string
  button_text: string
  image_url: string
  order_index: number
}

export const useCarouselStore = defineStore('carousel', {
  state: () => ({
    slides: [] as CarouselSlide[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchSlides() {
      this.loading = true
      try {
        const { data, error } = await supabase
          .from('carousel_slides')
          .select('*')
          .order('order_index')

        if (error) throw error
        console.log('Carousel data:', data)
        this.slides = data
      } catch (err) {
        console.error('Carousel error:', err)
        this.error = err instanceof Error ? err.message : 'Failed to fetch slides'
      } finally {
        this.loading = false
      }
    },

    async addSlide(slide: Omit<CarouselSlide, 'id'>) {
      try {
        const { data, error } = await supabase
          .from('carousel_slides')
          .insert(slide)
          .select()
          .single()

        if (error) throw error
        this.slides.push(data)
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to add slide'
        throw err
      }
    },

    async updateSlide(id: number, updates: Partial<CarouselSlide>) {
      try {
        const { data, error } = await supabase
          .from('carousel_slides')
          .update(updates)
          .eq('id', id)
          .select()
          .single()

        if (error) throw error
        const index = this.slides.findIndex((slide) => slide.id === id)
        if (index !== -1) {
          this.slides[index] = data
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to update slide'
        throw err
      }
    },

    async removeSlide(id: number) {
      try {
        const { error } = await supabase.from('carousel_slides').delete().eq('id', id)

        if (error) throw error
        const index = this.slides.findIndex((slide) => slide.id === id)
        if (index !== -1) {
          this.slides.splice(index, 1)
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to remove slide'
        throw err
      }
    },
  },
})
