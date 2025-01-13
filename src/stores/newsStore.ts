import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface NewsItem {
  id: number
  title: string
  category: 'Anime' | 'Manga' | 'Industry'
  date: string
  excerpt: string
  likes: number
  image?: string
}

export const useNewsStore = defineStore('news', () => {
  const news = ref<NewsItem[]>([])

  const initializeNews = () => {
    news.value = [
      {
        id: 1,
        category: 'Industry',
        title: 'Crunchyroll Announces Spring 2024 Lineup',
        excerpt:
          'Streaming platform reveals new and returning series for the upcoming season, including highly anticipated titles and exclusive premieres.',
        date: '2024-03-15',
        likes: 1205,
        image: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
      },
      {
        id: 2,
        category: 'Manga',
        title: 'One Piece Manga Enters Final Saga',
        excerpt:
          'Eiichiro Oda confirms the legendary series is approaching its conclusion after 25+ years of serialization. Fans speculate on the ending.',
        date: '2024-03-14',
        likes: 2431,
        image: 'https://cdn.myanimelist.net/images/manga/2/253146.jpg',
      },
      {
        id: 3,
        category: 'Anime',
        title: 'Studio Ghibli Announces New Film',
        excerpt:
          'Legendary animation studio reveals plans for their next feature film, marking their first release since 2023.',
        date: '2024-03-13',
        likes: 3102,
        image:
          'https://cdn.myanimelist.net/s/common/company_logos/e6d02dfe-71e9-49d2-bef1-68e585c2605e_600x600_i?s=f8bba4a0f7ae97f80c95e463c7529bd6',
      },
    ]
  }

  const likeNews = (id: number) => {
    const newsItem = news.value.find((item) => item.id === id)
    if (newsItem) {
      newsItem.likes++
    }
  }

  return {
    news,
    likeNews,
    initializeNews,
  }
})
