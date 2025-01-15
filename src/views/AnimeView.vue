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
import { useAnimeStore } from '../stores/animeStore'
import MediaHeroCarousel from '../components/common/MediaHeroCarousel.vue'
import TopRatedMediaCard from '../components/common/TopRatedMediaCard.vue'
import MediaReviewsSection from '../components/common/MediaReviewsSection.vue'
import MediaCurrentlyAiring from '../components/common/MediaCurrentlyAiring.vue'
import MediaStatistics from '../components/common/MediaStatistics.vue'
import MediaUpcoming from '../components/common/MediaUpcoming.vue'
import type { MediaCarouselSlide } from '../types/carousel'

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
      animeStore: useAnimeStore(),
      router: useRouter(),
      carouselLoading: true,
      carouselSlides: [] as MediaCarouselSlide[],
    }
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
      try {
        this.carouselLoading = true
        const topAnime = [...this.animeStore.animeList]
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
          .slice(0, 5)

        this.carouselSlides = topAnime.map((anime) => ({
          id: anime.id,
          title: anime.title,
          description: anime.synopsis || '',
          rating: anime.rating || 0,
          cover_image_url: anime.cover_image_url || anime.image_url || '',
        }))
      } catch (error) {
        console.error('Error preparing carousel slides:', error)
      } finally {
        this.carouselLoading = false
      }
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
