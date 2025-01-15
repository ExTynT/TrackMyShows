<template>
  <div class="anime-view">
    <!-- Hero Section -->
    <MediaHeroCarousel
      type="anime"
      :slides="carouselSlides"
      :loading="carouselLoading"
      @navigate="navigateToAnime"
    />

    <!-- Currently Airing Section -->
    <MediaCurrentlyAiring
      type="anime"
      :media-list="animeStore.animeList"
      @navigate="navigateToAnime"
    />

    <!-- Upcoming Section -->
    <MediaUpcoming
      type="anime"
      :media-list="animeStore.animeList"
      @navigate="navigateToAnime"
      @track="trackAnime"
    />

    <!-- Top Rated Section -->
    <section class="py-8 bg-grey-darken-4">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">Top Rated</h2>
        <v-row>
          <v-col v-for="(anime, index) in topRatedAnime" :key="anime.id" cols="12">
            <TopRatedMediaCard
              type="anime"
              :media="anime"
              :rank="index + 1"
              @click="navigateToAnime(anime.id)"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Reviews Section -->
    <MediaReviewsSection type="anime" />

    <!-- Media Statistics Section -->
    <section class="py-8">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">Media Statistics</h2>
        <MediaStatistics
          type="anime"
          :total-items="totalAnime"
          :total-episodes-or-chapters="totalEpisodesWatched"
          :average-rating="averageRating"
          :completion-rate="completionRate"
        />
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimeStore } from '@/stores/animeStore'
import MediaHeroCarousel from '@/components/common/MediaHeroCarousel.vue'
import TopRatedMediaCard from '@/components/common/TopRatedMediaCard.vue'
import MediaReviewsSection from '@/components/common/MediaReviewsSection.vue'
import MediaCurrentlyAiring from '@/components/common/MediaCurrentlyAiring.vue'
import MediaStatistics from '@/components/common/MediaStatistics.vue'
import MediaUpcoming from '@/components/common/MediaUpcoming.vue'
import type { CarouselSlide } from '@/types/carousel'

export default defineComponent({
  name: 'AnimeView',

  components: {
    MediaHeroCarousel,
    TopRatedMediaCard,
    MediaReviewsSection,
    MediaCurrentlyAiring,
    MediaStatistics,
    MediaUpcoming,
  },

  data() {
    return {
      carouselLoading: true,
      carouselSlides: [] as CarouselSlide[],
    }
  },

  setup() {
    const animeStore = useAnimeStore()
    const router = useRouter()
    return { animeStore, router }
  },

  computed: {
    topRatedAnime() {
      return [...this.animeStore.animeList]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 10)
    },
    totalAnime() {
      return this.animeStore.animeList.length
    },
    totalEpisodesWatched() {
      return this.animeStore.animeList.reduce((total, anime) => total + (anime.episodes || 0), 0)
    },
    averageRating() {
      const animeWithRatings = this.animeStore.animeList.filter((anime) => anime.rating)
      if (!animeWithRatings.length) return 0
      return (
        animeWithRatings.reduce((sum, anime) => sum + (anime.rating || 0), 0) /
        animeWithRatings.length
      )
    },
    completionRate() {
      const completed = this.animeStore.animeList.filter(
        (anime) => anime.status === 'finished',
      ).length
      return (completed / this.totalAnime) * 100
    },
  },

  methods: {
    navigateToAnime(animeId: number) {
      this.router.push(`/anime/${animeId}`)
    },

    trackAnime(animeId: number) {
      // TODO: Implement tracking functionality
      console.log('Tracking anime:', animeId)
    },

    async prepareCarouselSlides() {
      if (this.animeStore.animeList.length === 0) {
        await this.animeStore.fetchAnimeList()
      }

      // Find the IDs of Demon Slayer, Jujutsu Kaisen, and One Piece
      const demonSlayerId =
        this.animeStore.animeList.find(
          (a) =>
            a.title.toLowerCase().includes('demon slayer') ||
            a.title.toLowerCase().includes('kimetsu no yaiba'),
        )?.id || 1

      const jjkId =
        this.animeStore.animeList.find((a) => a.title.toLowerCase().includes('jujutsu kaisen'))
          ?.id || 2

      const onePieceId =
        this.animeStore.animeList.find((a) => a.title.toLowerCase().includes('one piece'))?.id || 3

      this.carouselSlides = [
        {
          id: demonSlayerId,
          title: 'Demon Slayer: Kimetsu no Yaiba',
          description:
            'Experience the breathtaking journey of Tanjiro Kamado, a young demon slayer who seeks to turn his sister back to human and avenge his family. With stunning animation and intense action, this series redefines the boundaries of anime storytelling.',
          rating: 4.8,
          cover_image_url:
            'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/sign/Images/ANIME/DS.avif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQU5JTUUvRFMuYXZpZiIsImlhdCI6MTczNjg2NDk2MywiZXhwIjoxNzY4NDAwOTYzfQ.H7RKAOjXKq5Q_-z15GjzgGvtufcxO2IFYwoJjELifkE&t=2025-01-14T14%3A29%3A23.359Z',
        },
        {
          id: jjkId,
          title: 'Jujutsu Kaisen',
          description:
            'Dive into a world where curses run rampant and sorcerers must master the art of Cursed Energy. Follow Yuji Itadori as he joins Tokyo Metropolitan Curse Technical School and faces supernatural threats that could destroy humanity.',
          rating: 4.9,
          cover_image_url:
            'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/sign/Images/ANIME/JJK.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQU5JTUUvSkpLLndlYnAiLCJpYXQiOjE3MzY4NjQ5NzgsImV4cCI6MTc2ODQwMDk3OH0.D4n4nAbYEVjXczsanKOhIxnt-tneZh-Vbbc5Jn3SQUc&t=2025-01-14T14%3A29%3A37.857Z',
        },
        {
          id: onePieceId,
          title: 'One Piece',
          description:
            'Join Monkey D. Luffy and his diverse crew on their epic quest to find the legendary One Piece treasure. This long-running series combines adventure, friendship, and spectacular battles in a unique world of pirates and mystery.',
          rating: 4.7,
          cover_image_url:
            'https://npzzfezhgcngyxffruls.supabase.co/storage/v1/object/sign/Images/ANIME/OP.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQU5JTUUvT1Aud2VicCIsImlhdCI6MTczNjg2NDk5MywiZXhwIjoxNzY4NDAwOTkzfQ.bmCWGP0594Mk_BdqmVArZdVUy-RcpZSmvDxR-plkFAU&t=2025-01-14T14%3A29%3A53.506Z',
        },
      ]
      this.carouselLoading = false
    },
  },

  async mounted() {
    await this.prepareCarouselSlides()
    if (this.animeStore.animeList.length === 0) {
      await this.animeStore.fetchAnimeList()
    }
  },
})
</script>

<style scoped>
.anime-view {
  min-height: 100vh;
  background: #121212;
  color: white;
}

section {
  position: relative;
  overflow: hidden;
}

section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.text-h4 {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.text-h4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--v-primary-base);
  border-radius: 2px;
}
</style>
