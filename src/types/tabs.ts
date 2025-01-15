import type { UserAnimeStatus } from './anime'

export interface TabOption {
  label: string
  value: UserAnimeStatus | 'favorites'
  icon: string
}
