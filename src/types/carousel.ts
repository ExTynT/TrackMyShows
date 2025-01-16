export interface HomeCarouselSlide {
  id: number
  title: string
  description: string
  button_text: string
  image_url: string
  order_index: number
  type: 'anime' | 'manga' | 'other'
  content_id?: number
  link?: string
}

export interface MediaCarouselSlide {
  id: number
  title: string
  description: string
  rating: number
  cover_image_url: string
}

export type CarouselSlide = HomeCarouselSlide | MediaCarouselSlide
