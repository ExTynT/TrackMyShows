export interface Blog {
  id: number
  title: string
  content: string
  full_content: string
  author: string
  date: string
  image_url?: string
  category: 'blog' | 'review'
  created_at: string
  updated_at: string
  rating?: number
}

export type Review = Blog
