import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface MediaCharacter {
  name: string
  role: string
  description: string
}

export interface StaffMember {
  name: string
  role: string
}

export interface BaseMedia {
  id: number
  title: string
  image: string
  type: 'TV' | 'Movie' | 'OVA' | 'Manga' | 'Light Novel'
  score: number
  status: string
  year: number
  genres: string[]
  synopsis: string
  weeklyViews: number
  monthlyViews: number
  weeklyRank: number
  monthlyRank: number
}

export interface AnimeDetails extends BaseMedia {
  episodes: number
  duration: string
  studios: string[]
  source: string
  rating: string
  aired: string
  season?: string
  mainCharacters: MediaCharacter[]
  staff: StaffMember[]
}

export interface MangaDetails extends BaseMedia {
  chapters: number
  volumes: number
  author: string
  serialization: string
  published: string
  mainCharacters: MediaCharacter[]
  staff: StaffMember[]
}

export type MediaType = 'anime' | 'manga'

export const useMediaStore = defineStore('media', () => {
  // State
  const trendingAnime = ref<AnimeDetails[]>([])
  const trendingManga = ref<MangaDetails[]>([])
  const seasonalAnime = ref<AnimeDetails[]>([])
  const popularAnime = ref<AnimeDetails[]>([])
  const popularManga = ref<MangaDetails[]>([])
  const news = ref([
    {
      id: 1,
      category: 'Industry',
      title: 'Crunchyroll Announces Spring 2024 Lineup',
      excerpt: 'Streaming platform reveals new and returning series for the upcoming season...',
      date: '2024-03-15',
      likes: 1205,
    },
    {
      id: 2,
      category: 'Manga',
      title: 'One Piece Manga Enters Final Saga',
      excerpt: 'Eiichiro Oda confirms the legendary series is approaching its conclusion...',
      date: '2024-03-14',
      likes: 2431,
    },
    {
      id: 3,
      category: 'Anime',
      title: 'Studio Ghibli Announces New Film',
      excerpt: 'Legendary animation studio reveals plans for their next feature film...',
      date: '2024-03-13',
      likes: 3102,
    },
  ])

  const reviews = ref([
    {
      id: 1,
      username: 'AnimeExpert',
      avatar: 'https://i.pravatar.cc/150?img=1',
      anime: "Frieren: Beyond Journey's End",
      rating: 9.2,
      content:
        'A beautiful and contemplative series that explores the meaning of life and relationships...',
      date: '2024-03-15',
      likes: 342,
    },
    {
      id: 2,
      username: 'MangaReader',
      avatar: 'https://i.pravatar.cc/150?img=2',
      anime: 'Solo Leveling',
      rating: 8.9,
      content: 'Incredible animation by A-1 Pictures brings this manhwa masterpiece to life...',
      date: '2024-03-14',
      likes: 256,
    },
    {
      id: 3,
      username: 'CriticKing',
      avatar: 'https://i.pravatar.cc/150?img=3',
      anime: 'Classroom of the Elite III',
      rating: 8.7,
      content: 'The third season maintains the high quality of psychological mind games...',
      date: '2024-03-13',
      likes: 189,
    },
  ])

  // Getters
  const getMediaById = computed(() => {
    return (type: MediaType, id: number) => {
      switch (type) {
        case 'anime':
          return [...trendingAnime.value, ...seasonalAnime.value, ...popularAnime.value].find(
            (item) => item.id === id,
          )
        case 'manga':
          return [...trendingManga.value, ...popularManga.value].find((item) => item.id === id)
      }
    }
  })

  const getTrendingMedia = computed(() => {
    return (type: MediaType) => (type === 'anime' ? trendingAnime.value : trendingManga.value)
  })

  const getPopularMedia = computed(() => {
    return (type: MediaType) => (type === 'anime' ? popularAnime.value : popularManga.value)
  })

  const getSeasonalAnime = computed(() => {
    return (season?: string) => {
      if (!season) return seasonalAnime.value
      return seasonalAnime.value.filter((anime) => anime.season === season)
    }
  })

  // Actions
  function initializeStore() {
    trendingAnime.value = [
      {
        id: 1,
        title: "Frieren: Beyond Journey's End",
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
        score: 8.83,
        episodes: 28,
        year: 2023,
        status: 'Currently Airing',
        genres: ['Adventure', 'Drama', 'Fantasy'],
        synopsis:
          'After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. The elf mage Frieren, who was part of this party, visits her former companions and begins to reflect. She realizes that she barely knew her companions and begins a journey to understand what life means to mortals and what she gained from her time with them.',
        weeklyViews: 150000,
        monthlyViews: 600000,
        weeklyRank: 1,
        monthlyRank: 1,
        duration: '24 min per ep',
        studios: ['Madhouse'],
        source: 'Manga',
        rating: 'PG-13',
        aired: 'Sep 29, 2023 to Mar 22, 2024',
        mainCharacters: [
          { name: 'Frieren', role: 'Main', description: 'The Elven Mage' },
          { name: 'Fern', role: 'Main', description: 'Apprentice Mage' },
          { name: 'Stark', role: 'Main', description: 'Young Warrior' },
          { name: 'Fran', role: 'Main', description: 'Priest' },
        ],
        staff: [
          { name: 'Keiichiro Saito', role: 'Director' },
          { name: 'Tomohiro Suzuki', role: 'Series Composition' },
          { name: 'Reiko Nagasawa', role: 'Character Design' },
        ],
      },
      {
        id: 2,
        title: 'Solo Leveling',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1801/142390.jpg',
        score: 8.71,
        episodes: 12,
        year: 2024,
        status: 'Currently Airing',
        genres: ['Action', 'Adventure', 'Fantasy'],
        synopsis:
          "In a world where hunters must battle deadly monsters to protect humanity, Sung Jinwoo, known as 'the weakest hunter of all mankind,' finds himself in a mysterious dungeon. After a near-death experience, he awakens to find a strange program called 'System' has granted him the unique ability to level up in strength, unlike any other hunter.",
        weeklyViews: 145000,
        monthlyViews: 580000,
        weeklyRank: 2,
        monthlyRank: 2,
        duration: '23 min per ep',
        studios: ['A-1 Pictures'],
        source: 'Web Novel',
        rating: 'R - 17+',
        aired: 'Jan 7, 2024 to Mar 31, 2024',
        mainCharacters: [
          { name: 'Sung Jinwoo', role: 'Main', description: 'The Weakest Hunter' },
          { name: 'Cha Hae-in', role: 'Supporting', description: 'S-Rank Hunter' },
          { name: 'Yoo Jinho', role: 'Supporting', description: "Jinwoo's Friend" },
          { name: 'Woo Jinchul', role: 'Supporting', description: 'Hunter Association' },
        ],
        staff: [
          { name: 'Shunsuke Nakashige', role: 'Director' },
          { name: 'Noboru Kimura', role: 'Series Composition' },
          { name: 'Tomoko Sudo', role: 'Character Design' },
        ],
      },
      {
        id: 11,
        title: 'Spy x Family Season 2',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1111/127508.jpg',
        score: 8.51,
        episodes: 12,
        year: 2023,
        status: 'Finished Airing',
        genres: ['Action', 'Comedy', 'Slice of Life'],
        synopsis:
          'The second season of Spy x Family continues the story of the Forger family as they navigate their double lives while trying to maintain world peace.',
        weeklyViews: 140000,
        monthlyViews: 560000,
        weeklyRank: 3,
        monthlyRank: 3,
        duration: '23 min per ep',
        studios: ['Wit Studio', 'CloverWorks'],
        source: 'Manga',
        rating: 'PG-13',
        aired: 'Oct 7, 2023 to Dec 23, 2023',
        mainCharacters: [
          { name: 'Loid Forger', role: 'Main', description: 'Spy Codenamed Twilight' },
          { name: 'Anya Forger', role: 'Main', description: 'Telepathic Daughter' },
          { name: 'Yor Forger', role: 'Main', description: 'Assassin Wife' },
          { name: 'Bond Forger', role: 'Main', description: 'Precognitive Dog' },
        ],
        staff: [
          { name: 'Kazuhiro Furuhashi', role: 'Director' },
          { name: 'Ichiro Okouchi', role: 'Series Composition' },
          { name: 'Kazuaki Shimada', role: 'Character Design' },
        ],
      },
      {
        id: 12,
        title: 'Bleach: Thousand-Year Blood War - The Separation',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1018/136667.jpg',
        score: 8.89,
        episodes: 13,
        year: 2023,
        status: 'Finished Airing',
        genres: ['Action', 'Adventure', 'Fantasy'],
        synopsis:
          'The second cour of Bleach: Thousand-Year Blood War adapts the middle portion of the final arc of the manga, featuring the war between the Shinigami and the Quincy.',
        weeklyViews: 135000,
        monthlyViews: 540000,
        weeklyRank: 4,
        monthlyRank: 4,
        duration: '24 min per ep',
        studios: ['Pierrot'],
        source: 'Manga',
        rating: 'R - 17+',
        aired: 'Jul 8, 2023 to Sep 30, 2023',
        mainCharacters: [
          { name: 'Ichigo Kurosaki', role: 'Main', description: 'Substitute Shinigami' },
          { name: 'Yhwach', role: 'Main', description: 'Quincy Emperor' },
          { name: 'Uryu Ishida', role: 'Main', description: 'Quincy' },
          { name: 'Sosuke Aizen', role: 'Supporting', description: 'Former Captain' },
        ],
        staff: [
          { name: 'Tomohisa Taguchi', role: 'Director' },
          { name: 'Masashi Kudo', role: 'Character Design' },
          { name: 'Shiro Sagisu', role: 'Music' },
        ],
      },
    ]

    seasonalAnime.value = [
      {
        id: 13,
        title: 'Sasaki and Peeps',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1624/139672.jpg',
        score: 7.82,
        episodes: 12,
        year: 2024,
        status: 'Currently Airing',
        genres: ['Fantasy', 'Slice of Life'],
        synopsis:
          'A former corporate worker encounters a mysterious bird who grants him magical powers, leading to a new life of adventure.',
        weeklyViews: 75000,
        monthlyViews: 300000,
        weeklyRank: 15,
        monthlyRank: 12,
        duration: '23 min per ep',
        studios: ['SILVER LINK.'],
        source: 'Light novel',
        rating: 'PG-13',
        aired: 'Jan 5, 2024 to Mar 22, 2024',
        season: 'Winter 2024',
        mainCharacters: [
          { name: 'Sasaki', role: 'Main', description: 'Former Office Worker' },
          { name: 'Peeps', role: 'Main', description: 'Magical Bird' },
        ],
        staff: [{ name: 'Mirai Minato', role: 'Director' }],
      },
      {
        id: 16,
        title: 'Solo Leveling',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1801/142390.jpg',
        score: 8.71,
        episodes: 12,
        year: 2024,
        status: 'Currently Airing',
        genres: ['Action', 'Adventure', 'Fantasy'],
        synopsis:
          'In a world where hunters must battle deadly monsters to protect humanity, Sung Jinwoo finds himself with a mysterious power to level up, unlike any other hunter.',
        weeklyViews: 145000,
        monthlyViews: 580000,
        weeklyRank: 2,
        monthlyRank: 2,
        duration: '23 min per ep',
        studios: ['A-1 Pictures'],
        source: 'Web Novel',
        rating: 'R - 17+',
        aired: 'Jan 7, 2024 to Mar 31, 2024',
        season: 'Winter 2024',
        mainCharacters: [
          { name: 'Sung Jinwoo', role: 'Main', description: 'The Weakest Hunter' },
          { name: 'Cha Hae-in', role: 'Supporting', description: 'S-Rank Hunter' },
        ],
        staff: [{ name: 'Shunsuke Nakashige', role: 'Director' }],
      },
      {
        id: 17,
        title: 'Classroom of the Elite III',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1332/139318.jpg',
        score: 8.42,
        episodes: 13,
        year: 2024,
        status: 'Currently Airing',
        genres: ['Drama', 'Psychological', 'Suspense'],
        synopsis:
          'The third season of the psychological thriller series continues to follow the complex schemes and machinations at the Advanced Nurturing High School.',
        weeklyViews: 95000,
        monthlyViews: 380000,
        weeklyRank: 8,
        monthlyRank: 7,
        duration: '23 min per ep',
        studios: ['Lerche'],
        source: 'Light novel',
        rating: 'PG-13',
        aired: 'Jan 3, 2024 to Mar 27, 2024',
        season: 'Winter 2024',
        mainCharacters: [
          { name: 'Kiyotaka Ayanokoji', role: 'Main', description: 'Mysterious Student' },
          { name: 'Suzune Horikita', role: 'Main', description: 'Class Leader' },
        ],
        staff: [{ name: 'Seiji Kishi', role: 'Director' }],
      },
      {
        id: 18,
        title: 'Mashle: Magic and Muscles Season 2',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1624/139672.jpg',
        score: 8.15,
        episodes: 12,
        year: 2024,
        status: 'Currently Airing',
        genres: ['Action', 'Comedy', 'Fantasy'],
        synopsis:
          'The second season continues to follow Mash Burnedead as he uses his muscles to solve problems in a world of magic.',
        weeklyViews: 85000,
        monthlyViews: 340000,
        weeklyRank: 10,
        monthlyRank: 9,
        duration: '23 min per ep',
        studios: ['A-1 Pictures'],
        source: 'Manga',
        rating: 'PG-13',
        aired: 'Jan 6, 2024 to Mar 30, 2024',
        season: 'Winter 2024',
        mainCharacters: [
          { name: 'Mash Burnedead', role: 'Main', description: 'Muscle Magic User' },
          { name: 'Finn Ames', role: 'Supporting', description: 'Friend' },
        ],
        staff: [{ name: 'Tomoya Tanaka', role: 'Director' }],
      },
      {
        id: 14,
        title: 'The Apothecary Diaries',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1708/138033.jpg',
        score: 8.42,
        episodes: 24,
        year: 2023,
        status: 'Currently Airing',
        genres: ['Drama', 'Mystery', 'Slice of Life'],
        synopsis:
          'A young pharmacist serves in the imperial court, solving mysteries with her knowledge of medicine and human nature.',
        weeklyViews: 85000,
        monthlyViews: 340000,
        weeklyRank: 12,
        monthlyRank: 10,
        duration: '23 min per ep',
        studios: ['OLM', 'TOHO animation STUDIO'],
        source: 'Light novel',
        rating: 'PG-13',
        aired: 'Oct 22, 2023 to Mar 24, 2024',
        season: 'Fall 2023',
        mainCharacters: [
          { name: 'Maomao', role: 'Main', description: 'Court Pharmacist' },
          { name: 'Jinshi', role: 'Main', description: 'High-Ranking Official' },
        ],
        staff: [{ name: 'Norihiro Naganuma', role: 'Director' }],
      },
      {
        id: 19,
        title: "Frieren: Beyond Journey's End",
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
        score: 8.83,
        episodes: 28,
        year: 2023,
        status: 'Currently Airing',
        genres: ['Adventure', 'Drama', 'Fantasy'],
        synopsis:
          'After the party of heroes defeated the Demon King, the elf mage Frieren begins to understand what life means to mortals.',
        weeklyViews: 150000,
        monthlyViews: 600000,
        weeklyRank: 1,
        monthlyRank: 1,
        duration: '24 min per ep',
        studios: ['Madhouse'],
        source: 'Manga',
        rating: 'PG-13',
        aired: 'Sep 29, 2023 to Mar 22, 2024',
        season: 'Fall 2023',
        mainCharacters: [
          { name: 'Frieren', role: 'Main', description: 'The Elven Mage' },
          { name: 'Fern', role: 'Main', description: 'Apprentice Mage' },
        ],
        staff: [{ name: 'Keiichiro Saito', role: 'Director' }],
      },
      {
        id: 20,
        title: 'Jujutsu Kaisen Season 2',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
        score: 9.06,
        episodes: 23,
        year: 2023,
        status: 'Finished Airing',
        genres: ['Action', 'Fantasy'],
        synopsis: 'The second season covers both the Hidden Inventory and Shibuya Incident arcs.',
        weeklyViews: 78000,
        monthlyViews: 312000,
        weeklyRank: 4,
        monthlyRank: 4,
        duration: '23 min per ep',
        studios: ['MAPPA'],
        source: 'Manga',
        rating: 'R - 17+',
        aired: 'Jul 6, 2023 to Dec 28, 2023',
        season: 'Fall 2023',
        mainCharacters: [
          { name: 'Satoru Gojo', role: 'Main', description: 'The Strongest Sorcerer' },
          { name: 'Suguru Geto', role: 'Main', description: 'Former Best Friend' },
        ],
        staff: [{ name: 'Shota Goshozono', role: 'Director' }],
      },
      {
        id: 21,
        title: 'Spy x Family Season 2',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1111/127508.jpg',
        score: 8.51,
        episodes: 12,
        year: 2023,
        status: 'Finished Airing',
        genres: ['Action', 'Comedy', 'Slice of Life'],
        synopsis: 'The second season of Spy x Family continues the story of the Forger family.',
        weeklyViews: 140000,
        monthlyViews: 560000,
        weeklyRank: 3,
        monthlyRank: 3,
        duration: '23 min per ep',
        studios: ['Wit Studio', 'CloverWorks'],
        source: 'Manga',
        rating: 'PG-13',
        aired: 'Oct 7, 2023 to Dec 23, 2023',
        season: 'Fall 2023',
        mainCharacters: [
          { name: 'Loid Forger', role: 'Main', description: 'Spy Codenamed Twilight' },
          { name: 'Anya Forger', role: 'Main', description: 'Telepathic Daughter' },
        ],
        staff: [{ name: 'Kazuhiro Furuhashi', role: 'Director' }],
      },
      {
        id: 15,
        title: 'Zom 100: Bucket List of the Dead',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1384/136408.jpg',
        score: 8.12,
        episodes: 12,
        year: 2023,
        status: 'Finished Airing',
        genres: ['Action', 'Comedy', 'Horror'],
        synopsis:
          'When a zombie apocalypse hits, a burned-out employee decides to make the most of his newfound freedom by completing his bucket list.',
        weeklyViews: 70000,
        monthlyViews: 280000,
        weeklyRank: 18,
        monthlyRank: 15,
        duration: '23 min per ep',
        studios: ['BUG FILMS'],
        source: 'Manga',
        rating: 'R - 17+',
        aired: 'Jul 9, 2023 to Oct 22, 2023',
        season: 'Summer 2023',
        mainCharacters: [
          { name: 'Akira Tendo', role: 'Main', description: 'Former Office Worker' },
          { name: 'Kencho Hata', role: 'Main', description: 'Best Friend' },
        ],
        staff: [{ name: 'Kazuki Kawagoe', role: 'Director' }],
      },
      {
        id: 22,
        title: 'Bleach: Thousand-Year Blood War - The Separation',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1018/136667.jpg',
        score: 8.89,
        episodes: 13,
        year: 2023,
        status: 'Finished Airing',
        genres: ['Action', 'Adventure', 'Fantasy'],
        synopsis:
          'The second cour of Bleach: Thousand-Year Blood War adapts the middle portion of the final arc.',
        weeklyViews: 135000,
        monthlyViews: 540000,
        weeklyRank: 4,
        monthlyRank: 4,
        duration: '24 min per ep',
        studios: ['Pierrot'],
        source: 'Manga',
        rating: 'R - 17+',
        aired: 'Jul 8, 2023 to Sep 30, 2023',
        season: 'Summer 2023',
        mainCharacters: [
          { name: 'Ichigo Kurosaki', role: 'Main', description: 'Substitute Shinigami' },
          { name: 'Yhwach', role: 'Main', description: 'Quincy Emperor' },
        ],
        staff: [{ name: 'Tomohisa Taguchi', role: 'Director' }],
      },
      {
        id: 23,
        title: 'Horimiya: The Missing Pieces',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1007/136277.jpg',
        score: 8.05,
        episodes: 13,
        year: 2023,
        status: 'Finished Airing',
        genres: ['Romance', 'Slice of Life'],
        synopsis:
          'Additional stories from the original manga that were not adapted in the first season.',
        weeklyViews: 65000,
        monthlyViews: 260000,
        weeklyRank: 20,
        monthlyRank: 18,
        duration: '23 min per ep',
        studios: ['CloverWorks'],
        source: 'Manga',
        rating: 'PG-13',
        aired: 'Jul 1, 2023 to Sep 23, 2023',
        season: 'Summer 2023',
        mainCharacters: [
          { name: 'Izumi Miyamura', role: 'Main', description: 'Male Protagonist' },
          { name: 'Kyoko Hori', role: 'Main', description: 'Female Protagonist' },
        ],
        staff: [{ name: 'Tetsuo Hirakawa', role: 'Director' }],
      },
      {
        id: 24,
        title: 'Mushoku Tensei II',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1898/138005.jpg',
        score: 8.78,
        episodes: 12,
        year: 2023,
        status: 'Finished Airing',
        genres: ['Drama', 'Fantasy'],
        synopsis:
          'The second season of Mushoku Tensei continues to follow Rudeus on his journey of redemption and adventure.',
        weeklyViews: 125000,
        monthlyViews: 500000,
        weeklyRank: 5,
        monthlyRank: 5,
        duration: '23 min per ep',
        studios: ['Studio Bind'],
        source: 'Light novel',
        rating: 'R - 17+',
        aired: 'Jul 3, 2023 to Sep 25, 2023',
        season: 'Summer 2023',
        mainCharacters: [
          { name: 'Rudeus Greyrat', role: 'Main', description: 'Reincarnated Protagonist' },
          { name: 'Roxy Migurdia', role: 'Main', description: 'Former Teacher' },
        ],
        staff: [{ name: 'Manabu Okamoto', role: 'Director' }],
      },
    ]

    popularAnime.value = [
      {
        id: 5,
        title: 'Fullmetal Alchemist: Brotherhood',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1208/94745.jpg',
        score: 9.1,
        episodes: 64,
        year: 2009,
        status: 'Finished Airing',
        genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
        synopsis:
          "After a failed alchemical ritual leaves brothers Edward and Alphonse Elric with severely damaged bodies, they begin searching for the one thing that can save them; the fabled Philosopher's Stone.",
        weeklyViews: 90000,
        monthlyViews: 360000,
        weeklyRank: 1,
        monthlyRank: 1,
        duration: '24 min per ep',
        studios: ['Bones'],
        source: 'Manga',
        rating: 'R - 17+',
        aired: 'Apr 5, 2009 to Jul 4, 2010',
        mainCharacters: [
          { name: 'Edward Elric', role: 'Main', description: 'Fullmetal Alchemist' },
          { name: 'Alphonse Elric', role: 'Main', description: 'Younger Brother' },
          { name: 'Roy Mustang', role: 'Main', description: 'Flame Alchemist' },
          { name: 'Winry Rockbell', role: 'Main', description: 'Childhood Friend' },
        ],
        staff: [
          { name: 'Yasuhiro Irie', role: 'Director' },
          { name: 'Hiroshi Ōnogi', role: 'Series Composition' },
          { name: 'Hiromu Arakawa', role: 'Original Creator' },
        ],
      },
      {
        id: 6,
        title: 'Steins;Gate',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg',
        score: 9.07,
        episodes: 24,
        year: 2011,
        status: 'Finished Airing',
        genres: ['Drama', 'Psychological', 'Sci-Fi', 'Thriller'],
        synopsis:
          "A self-proclaimed mad scientist rents out a room in a rickety old building in Akihabara, where he indulges himself in his hobby of inventing prospective 'future gadgets' with fellow lab members.",
        weeklyViews: 85000,
        monthlyViews: 340000,
        weeklyRank: 2,
        monthlyRank: 2,
        duration: '24 min per ep',
        studios: ['White Fox'],
        source: 'Visual novel',
        rating: 'PG-13',
        aired: 'Apr 6, 2011 to Sep 14, 2011',
        mainCharacters: [
          { name: 'Rintarou Okabe', role: 'Main', description: 'Mad Scientist' },
          { name: 'Kurisu Makise', role: 'Main', description: 'Genius Girl' },
          { name: 'Mayuri Shiina', role: 'Main', description: 'Childhood Friend' },
          { name: 'Itaru Hashida', role: 'Main', description: 'Super Hacker' },
        ],
        staff: [
          { name: 'Hiroshi Hamasaki', role: 'Director' },
          { name: 'Jukki Hanada', role: 'Series Composition' },
          { name: 'Kyuuta Sakai', role: 'Character Design' },
        ],
      },
      {
        id: 9,
        title: 'Attack on Titan Final Season THE FINAL CHAPTERS Special 2',
        type: 'Movie',
        image: 'https://cdn.myanimelist.net/images/anime/1279/131078.jpg',
        score: 9.14,
        episodes: 1,
        year: 2023,
        status: 'Finished Airing',
        genres: ['Action', 'Drama', 'Suspense'],
        synopsis: 'The epic conclusion to Attack on Titan as humanity faces its ultimate test.',
        weeklyViews: 82000,
        monthlyViews: 328000,
        weeklyRank: 3,
        monthlyRank: 3,
        duration: '85 min',
        studios: ['MAPPA'],
        source: 'Manga',
        rating: 'R - 17+',
        aired: 'Nov 4, 2023',
        mainCharacters: [
          { name: 'Eren Yeager', role: 'Main', description: 'The Protagonist' },
          { name: 'Mikasa Ackerman', role: 'Main', description: 'Childhood Friend' },
          { name: 'Armin Arlert', role: 'Main', description: 'Tactical Genius' },
          { name: 'Levi', role: 'Main', description: "Humanity's Strongest Soldier" },
        ],
        staff: [
          { name: 'Yuichiro Hayashi', role: 'Director' },
          { name: 'Hiroshi Seko', role: 'Series Composition' },
          { name: 'Kohta Yamamoto', role: 'Music' },
        ],
      },
      {
        id: 10,
        title: 'Jujutsu Kaisen Season 2',
        type: 'TV',
        image: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
        score: 9.06,
        episodes: 23,
        year: 2023,
        status: 'Finished Airing',
        genres: ['Action', 'Fantasy'],
        synopsis: 'The second season covers both the Hidden Inventory and Shibuya Incident arcs.',
        weeklyViews: 78000,
        monthlyViews: 312000,
        weeklyRank: 4,
        monthlyRank: 4,
        duration: '23 min per ep',
        studios: ['MAPPA'],
        source: 'Manga',
        rating: 'R - 17+',
        aired: 'Jul 6, 2023 to Dec 28, 2023',
        mainCharacters: [
          { name: 'Satoru Gojo', role: 'Main', description: 'The Strongest Sorcerer' },
          { name: 'Suguru Geto', role: 'Main', description: 'Former Best Friend' },
          { name: 'Yuji Itadori', role: 'Main', description: 'Main Protagonist' },
          { name: 'Megumi Fushiguro', role: 'Main', description: 'Ten Shadows User' },
        ],
        staff: [
          { name: 'Shota Goshozono', role: 'Director' },
          { name: 'Hiroshi Seko', role: 'Series Composition' },
          { name: 'Tadashi Hiramatsu', role: 'Character Design' },
        ],
      },
    ]

    popularManga.value = [
      {
        id: 101,
        title: 'Berserk',
        type: 'Manga',
        image: 'https://cdn.myanimelist.net/images/manga/1/157897.jpg',
        score: 9.48,
        chapters: 374,
        volumes: 41,
        year: 1989,
        status: 'Publishing',
        genres: ['Action', 'Adventure', 'Drama', 'Fantasy', 'Horror', 'Supernatural'],
        synopsis:
          "Guts, a former mercenary now known as the 'Black Swordsman,' seeks revenge against his former friend and leader, Griffith, after a doomed eclipse proclaimed the sacrificial branding of Guts and his lover.",
        weeklyViews: 50000,
        monthlyViews: 200000,
        weeklyRank: 1,
        monthlyRank: 1,
        author: 'MIURA, Kentarou',
        serialization: 'Young Animal',
        published: 'Aug 25, 1989 to present',
        mainCharacters: [
          { name: 'Guts', role: 'Main', description: 'Black Swordsman' },
          { name: 'Griffith', role: 'Main', description: 'White Hawk' },
          { name: 'Casca', role: 'Main', description: 'Female Warrior' },
          { name: 'Puck', role: 'Main', description: 'Elf Companion' },
        ],
        staff: [
          { name: 'Kentarou Miura', role: 'Story & Art' },
          { name: 'Studio Gaga', role: 'Art (continuation)' },
        ],
      },
      {
        id: 102,
        title: 'Vagabond',
        type: 'Manga',
        image: 'https://cdn.myanimelist.net/images/manga/1/259070.jpg',
        score: 9.21,
        chapters: 327,
        volumes: 37,
        year: 1998,
        status: 'On Hiatus',
        genres: ['Action', 'Adventure', 'Drama', 'Historical', 'Samurai'],
        synopsis:
          'Growing up in the late 16th century Sengoku era Japan, Shinmen Takezou is shunned by the local villagers as a devil child due to his wild and violent nature. Running away from home with a fellow boy at age 17, Takezo joins the Toyotomi army to fight the Tokugawa clan.',
        weeklyViews: 45000,
        monthlyViews: 180000,
        weeklyRank: 2,
        monthlyRank: 2,
        author: 'INOUE, Takehiko',
        serialization: 'Weekly Morning',
        published: 'Sep 3, 1998 to May 21, 2015',
        mainCharacters: [
          { name: 'Miyamoto Musashi', role: 'Main', description: 'Legendary Swordsman' },
          { name: 'Sasaki Kojiro', role: 'Main', description: 'Rival' },
          { name: 'Otsu', role: 'Supporting', description: 'Childhood Friend' },
          { name: 'Takuan Soho', role: 'Supporting', description: 'Buddhist Monk' },
        ],
        staff: [{ name: 'Takehiko Inoue', role: 'Story & Art' }],
      },
      {
        id: 105,
        title: 'Oyasumi Punpun',
        type: 'Manga',
        image: 'https://cdn.myanimelist.net/images/manga/3/266834.jpg',
        score: 9.08,
        chapters: 147,
        volumes: 13,
        year: 2007,
        status: 'Finished',
        genres: ['Drama', 'Psychological', 'Slice of Life'],
        synopsis:
          'Punpun follows the life of a young boy and his family/friends, dealing with his coming of age and deteriorating mental state.',
        weeklyViews: 40000,
        monthlyViews: 160000,
        weeklyRank: 3,
        monthlyRank: 3,
        author: 'ASANO, Inio',
        serialization: 'Big Comic Spirits',
        published: 'Mar 15, 2007 to Nov 2, 2013',
        mainCharacters: [
          { name: 'Punpun Onodera', role: 'Main', description: 'The Protagonist' },
          { name: 'Aiko Tanaka', role: 'Main', description: 'First Love' },
          { name: 'Sachi', role: 'Supporting', description: 'Manga Artist' },
          { name: 'God', role: 'Supporting', description: 'Spiritual Guide' },
        ],
        staff: [{ name: 'Inio Asano', role: 'Story & Art' }],
      },
      {
        id: 106,
        title: 'Monster',
        type: 'Manga',
        image: 'https://cdn.myanimelist.net/images/manga/3/258224.jpg',
        score: 9.16,
        chapters: 162,
        volumes: 18,
        year: 1994,
        status: 'Finished',
        genres: ['Drama', 'Mystery', 'Psychological', 'Thriller'],
        synopsis:
          "Dr. Kenzo Tenma saves a young boy's life, only to later discover that his patient has grown into a monster.",
        weeklyViews: 35000,
        monthlyViews: 140000,
        weeklyRank: 4,
        monthlyRank: 4,
        author: 'URASAWA, Naoki',
        serialization: 'Big Comic Original',
        published: 'Dec 1994 to Dec 2001',
        mainCharacters: [
          { name: 'Kenzo Tenma', role: 'Main', description: 'Brilliant Surgeon' },
          { name: 'Johan Liebert', role: 'Main', description: 'The Monster' },
          { name: 'Nina Fortner', role: 'Main', description: "Johan's Twin" },
          { name: 'Heinrich Lunge', role: 'Supporting', description: 'BKA Inspector' },
        ],
        staff: [{ name: 'Naoki Urasawa', role: 'Story & Art' }],
      },
    ]

    trendingManga.value = [
      {
        id: 103,
        title: 'One Piece',
        type: 'Manga',
        image: 'https://cdn.myanimelist.net/images/manga/2/253146.jpg',
        score: 9.15,
        chapters: 1101,
        volumes: 107,
        year: 1997,
        status: 'Publishing',
        genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
        synopsis:
          "Gol D. Roger, a man referred to as the 'Pirate King,' is set to be executed by the World Government. But just before his death, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line.",
        weeklyViews: 200000,
        monthlyViews: 800000,
        weeklyRank: 1,
        monthlyRank: 1,
        author: 'ODA, Eiichiro',
        serialization: 'Weekly Shounen Jump',
        published: 'Jul 22, 1997 to present',
        mainCharacters: [
          { name: 'Monkey D. Luffy', role: 'Main', description: 'Captain' },
          { name: 'Roronoa Zoro', role: 'Main', description: 'Swordsman' },
          { name: 'Nami', role: 'Main', description: 'Navigator' },
          { name: 'Usopp', role: 'Main', description: 'Sniper' },
        ],
        staff: [{ name: 'Eiichiro Oda', role: 'Story & Art' }],
      },
      {
        id: 104,
        title: 'Chainsaw Man',
        type: 'Manga',
        image: 'https://cdn.myanimelist.net/images/manga/3/216464.jpg',
        score: 8.67,
        chapters: 148,
        volumes: 15,
        year: 2018,
        status: 'Publishing',
        genres: ['Action', 'Horror', 'Supernatural'],
        synopsis:
          "Denji is a young man trapped in poverty, working off his deceased father's debt to the yakuza by harvesting devil corpses with his pet devil-dog Pochita. After being killed by a devil, Pochita merges with Denji's corpse and grants him the ability to transform into Chainsaw Man.",
        weeklyViews: 180000,
        monthlyViews: 720000,
        weeklyRank: 2,
        monthlyRank: 2,
        author: 'FUJIMOTO, Tatsuki',
        serialization: 'Weekly Shounen Jump',
        published: 'Dec 3, 2018 to present',
        mainCharacters: [
          { name: 'Denji', role: 'Main', description: 'Chainsaw Man' },
          { name: 'Power', role: 'Main', description: 'Blood Fiend' },
          { name: 'Makima', role: 'Main', description: 'Control Devil' },
          { name: 'Aki Hayakawa', role: 'Main', description: 'Devil Hunter' },
        ],
        staff: [{ name: 'Tatsuki Fujimoto', role: 'Story & Art' }],
      },
      {
        id: 107,
        title: 'Blue Lock',
        type: 'Manga',
        image: 'https://cdn.myanimelist.net/images/manga/5/213340.jpg',
        score: 8.52,
        chapters: 237,
        volumes: 25,
        year: 2018,
        status: 'Publishing',
        genres: ['Action', 'Drama', 'Sports'],
        synopsis:
          "After a disastrous defeat at the 2018 World Cup, Japan's team struggles to regroup. The Japanese Football Association hires the enigmatic Ego Jinpachi, who creates a radical new training program called Blue Lock, isolating 300 young strikers in a prison-like facility to determine the next national team forward.",
        weeklyViews: 160000,
        monthlyViews: 640000,
        weeklyRank: 3,
        monthlyRank: 3,
        author: 'KANESHIRO, Muneyuki',
        serialization: 'Weekly Shounen Magazine',
        published: 'Aug 1, 2018 to present',
        mainCharacters: [
          { name: 'Yoichi Isagi', role: 'Main', description: 'Striker' },
          { name: 'Meguru Bachira', role: 'Main', description: 'Forward' },
          { name: 'Rensuke Kunigami', role: 'Main', description: 'Forward' },
          { name: 'Hyoma Chigiri', role: 'Main', description: 'Forward' },
        ],
        staff: [
          { name: 'Muneyuki Kaneshiro', role: 'Story' },
          { name: 'Yusuke Nomura', role: 'Art' },
        ],
      },
      {
        id: 108,
        title: 'Jujutsu Kaisen',
        type: 'Manga',
        image: 'https://cdn.myanimelist.net/images/manga/3/210341.jpg',
        score: 8.58,
        chapters: 253,
        volumes: 24,
        year: 2018,
        status: 'Publishing',
        genres: ['Action', 'Fantasy', 'Horror'],
        synopsis:
          "Yuji Itadori is an ordinary high school student who joins his school's Occult Club for fun. However, when they accidentally unseal a cursed object, Yuji swallows it to protect his friends, becoming the host of Sukuna, the King of Curses.",
        weeklyViews: 150000,
        monthlyViews: 600000,
        weeklyRank: 4,
        monthlyRank: 4,
        author: 'AKUTAMI, Gege',
        serialization: 'Weekly Shounen Jump',
        published: 'Mar 5, 2018 to present',
        mainCharacters: [
          { name: 'Yuji Itadori', role: 'Main', description: 'Jujutsu Sorcerer' },
          { name: 'Megumi Fushiguro', role: 'Main', description: 'Ten Shadows User' },
          { name: 'Nobara Kugisaki', role: 'Main', description: 'Hammer User' },
          { name: 'Satoru Gojo', role: 'Main', description: 'Strongest Sorcerer' },
        ],
        staff: [{ name: 'Gege Akutami', role: 'Story & Art' }],
      },
    ]
  }

  return {
    // State
    trendingAnime,
    trendingManga,
    seasonalAnime,
    popularAnime,
    popularManga,
    news,
    reviews,
    // Getters
    getMediaById,
    getTrendingMedia,
    getPopularMedia,
    getSeasonalAnime,
    // Actions
    initializeStore,
  }
})
