import type { AnimeStatus } from './anime'
import type { MangaStatus } from './manga'

export interface MediaItem {
  id: number
  title: string
  image_url: string
  rating: number
}

export interface Character {
  id: number
  name: string
  japanese_name?: string
  description?: string
  image_url?: string
}

export interface ProgressModel {
  status: string
  progress: number
}

export interface Credit {
  id: number
  name: string
  logo_url?: string
}

export interface Media {
  id: number
  title: string
  japanese_title?: string
  image_url: string
  cover_image_url?: string
  synopsis?: string
  status: AnimeStatus | MangaStatus
  episodes?: number
  chapters?: number
  volumes?: number
  season?: string
  year?: number
  rating: number
  genres: Array<{ id: number; name: string }>
}
