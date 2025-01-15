export type AnimeStatus = 'airing' | 'finished' | 'upcoming'
export type AnimeSeason = 'winter' | 'spring' | 'summer' | 'fall'
export type UserAnimeStatus = 'watching' | 'completed' | 'on_hold' | 'plan_to_watch' | 'dropped'

export interface TabOption {
  label: string
  value: UserAnimeStatus | 'favorites'
  icon: string
}

export interface StatusOption {
  label: string
  value: UserAnimeStatus
  icon: string
}

export interface Anime {
  id: number
  title: string
  japanese_title?: string
  image_url?: string
  cover_image_url?: string
  synopsis?: string
  status: AnimeStatus
  episodes?: number
  season?: AnimeSeason
  year?: number
  rating?: number
  popularity?: number
  genres?: GenreRelation[]
  studios?: StudioRelation[]
  characters?: Character[]
  reviews?: AnimeReview[]
  airing_start?: string
  airing_end?: string
}

export interface GenreRelation {
  genres: Genre
}

export interface StudioRelation {
  studios: Studio
}

export interface Genre {
  id: number
  name: string
}

export interface Studio {
  id: number
  name: string
  logo_url?: string
}

export interface Character {
  id: number
  name: string
  japanese_name?: string
  image_url?: string
  description?: string
  anime_id: number
}

export interface AnimeReview {
  id: number
  anime_id: number
  user_id: string
  rating: number
  content: string
  created_at: string
  updated_at: string
}

export interface UserAnimeListItem {
  id: number
  user_id: string
  anime_id: number
  status: UserAnimeStatus
  rating?: number
  episodes_watched: number
  notes?: string
  start_date?: string
  finish_date?: string
  rewatch_count: number
  favorite: boolean
  created_at: string
  updated_at: string
  anime: {
    id: number
    title: string
    image_url: string
    episodes: number
    status: string
    synopsis?: string
    genres?: GenreRelation[]
  }
}

export interface AnimeStatistics {
  totalAnime: number
  totalEpisodes: number
  averageRating: number
  completionRate: number
  totalRewatches: number
}
