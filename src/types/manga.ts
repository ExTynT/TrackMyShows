export type MangaStatus = 'ongoing' | 'completed' | 'hiatus' | 'cancelled'
export type UserMangaStatus = 'reading' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_read'

export interface UserMangaListItem {
  id: number
  manga_id: number
  status: UserMangaStatus
  chapters_read: number
  rating?: number
  notes?: string
  favorite: boolean
  start_date?: string
  finish_date?: string
  created_at: string
  updated_at: string
  manga: Manga
}

export interface Manga {
  id: number
  title: string
  japanese_title?: string
  synopsis: string
  chapters: number
  volumes: number
  status: MangaStatus
  year: number
  image_url: string
  cover_image_url?: string
  publishing_start?: string
  publishing_end?: string
  rating?: number
  popularity?: number
  genres: Array<{
    id: number
    name: string
  }>
  authors: Array<{
    id: number
    name: string
    japanese_name?: string
    role: string
  }>
  characters?: Array<{
    id: number
    name: string
    japanese_name?: string
    image_url?: string
    description?: string
  }>
}
