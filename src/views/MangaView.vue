<template>
  <div class="manga-view">
    <!-- Hlavný carousel s populárnou mangou -->
    <MediaHeroCarousel
      type="manga"
      :slides="carouselSlides"
      :loading="carouselLoading"
      @navigate="navigateToManga"
    />

    <!-- Aktuálne vydávané mangy -->
    <MediaCurrentlyAiring
      type="manga"
      :media-list="mangaStore.mangaList"
      @navigate="navigateToManga"
    />

    <!-- Pripravované mangy -->
    <MediaUpcoming type="manga" :media-list="mangaStore.mangaList" @navigate="navigateToManga" />

    <!-- Najlepšie hodnotené mangy -->
    <section class="py-8 bg-grey-darken-4">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">Top Rated</h2>
        <v-row>
          <v-col v-for="(manga, index) in topRatedManga" :key="manga.id" cols="12">
            <TopRatedMediaCard
              type="manga"
              :media="manga"
              :rank="index + 1"
              @click="navigateToManga(manga.id)"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Sekcia s recenziami -->
    <MediaReviewsSection type="manga" />

    <!-- Štatistiky mangy -->
    <section class="py-8">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">Media Statistics</h2>
        <MediaStatistics
          type="manga"
          :total-items="totalManga"
          :total-episodes-or-chapters="totalChaptersRead"
          :average-rating="averageMangaRating"
          :completion-rate="mangaCompletionRate"
        />
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useMangaStore } from '../stores/mangaStore'
import MediaHeroCarousel from '../components/common/MediaHeroCarousel.vue'
import TopRatedMediaCard from '../components/common/TopRatedMediaCard.vue'
import MediaReviewsSection from '../components/common/MediaReviewsSection.vue'
import MediaCurrentlyAiring from '../components/common/MediaCurrentlyAiring.vue'
import MediaStatistics from '../components/common/MediaStatistics.vue'
import MediaUpcoming from '../components/common/MediaUpcoming.vue'
import type { MediaCarouselSlide } from '../types/carousel'

export default defineComponent({
  name: 'MangaView',

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
      mangaStore: useMangaStore(),
      router: useRouter(),
      carouselLoading: true,
      carouselSlides: [] as MediaCarouselSlide[],
    }
  },

  computed: {
    // Výber 10 najlepšie hodnotených máng
    topRatedManga() {
      return [...this.mangaStore.mangaList]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 10)
    },

    // Celkový počet máng
    totalManga() {
      return this.mangaStore.mangaList.length
    },

    // Celkový počet prečítaných kapitol
    totalChaptersRead() {
      return this.mangaStore.mangaList.reduce((total, manga) => total + (manga.chapters || 0), 0)
    },

    // Priemerné hodnotenie všetkých máng
    averageMangaRating() {
      const mangaWithRatings = this.mangaStore.mangaList.filter((manga) => manga.rating)
      if (!mangaWithRatings.length) return 0
      return (
        mangaWithRatings.reduce((sum, manga) => sum + (manga.rating || 0), 0) /
        mangaWithRatings.length
      )
    },

    // Percento dokončených máng
    mangaCompletionRate() {
      const completed = this.mangaStore.mangaList.filter(
        (manga) => manga.status === 'completed',
      ).length
      return (completed / this.totalManga) * 100
    },
  },

  methods: {
    // Presmerovanie na detail mangy
    navigateToManga(id: number) {
      this.router.push(`/manga/${id}`)
    },

    // Príprava slidov pre carousel
    async prepareCarouselSlides() {
      this.carouselLoading = true
      try {
        // Načítanie mangy ak ešte nie je načítaná
        if (this.mangaStore.mangaList.length === 0) {
          await this.mangaStore.fetchMangaList()
        }

        // Získanie top 3 máng podľa hodnotenia
        const topManga = [...this.mangaStore.mangaList]
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 3)

        this.carouselSlides = topManga.map((manga) => ({
          id: manga.id,
          title: manga.title,
          description: manga.synopsis,
          cover_image_url: manga.cover_image_url || manga.image_url,
          rating: manga.rating || 0,
        }))
      } catch (error) {
        console.error('Error preparing carousel slides:', error)
      } finally {
        this.carouselLoading = false
      }
    },
  },

  // Inicializácia pri načítaní komponenty
  async mounted() {
    await this.prepareCarouselSlides()
  },
})
</script>

<style scoped>
.manga-view {
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
