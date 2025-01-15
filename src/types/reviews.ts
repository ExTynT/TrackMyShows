export interface Review {
  id: number
  anime_id: number
  user_id: string
  rating: number
  content: string
  created_at: string
  updated_at: string
  type: 'anime' | 'manga'
}

export interface ReviewWithMedia extends Review {
  media: {
    id: number
    title: string
    image_url: string
  }
}
