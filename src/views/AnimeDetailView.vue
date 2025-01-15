<template>
  <div v-if="loading" class="d-flex justify-center align-center" style="min-height: 400px">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else-if="mappedAnime" class="anime-detail">
    <!-- Hero Section -->
    <media-detail-hero
      type="anime"
      :media="mappedAnime"
      :credits="
        animeStore.currentAnime?.studios?.map((studio) => ({
          id: studio.studios.id,
          name: studio.studios.name,
          logo_url: studio.studios.logo_url,
        })) || []
      "
    />

    <v-container class="py-8">
      <v-row>
        <!-- Main Content -->
        <v-col cols="12" md="8">
          <!-- Details -->
          <media-detail-info
            type="anime"
            :media="mappedAnime"
            :credits="
              animeStore.currentAnime?.studios?.map((studio) => ({
                id: studio.studios.id,
                name: studio.studios.name,
                logo_url: studio.studios.logo_url,
              })) || []
            "
          />

          <!-- Characters -->
          <media-detail-characters
            :characters="
              animeStore.currentAnime?.characters?.map((char) => ({
                id: char.id,
                name: char.name,
                japanese_name: char.japanese_name,
                description: char.description,
                icon: 'mdi-account',
              })) || []
            "
          />
        </v-col>

        <!-- Sidebar -->
        <v-col cols="12" md="4">
          <!-- User Progress -->
          <media-detail-progress
            type="anime"
            v-model="progressModel"
            :max-progress="mappedAnime.episodes || 0"
            :loading="updating"
            @update="updateProgress"
          />

          <!-- Similar Anime -->
          <media-detail-similar type="anime" :items="similarAnime" />
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else class="d-flex justify-center align-center" style="min-height: 400px">
    <div class="text-center">
      <v-icon size="64" color="grey" class="mb-4">mdi-alert</v-icon>
      <h3 class="text-h5 text-grey-darken-1">Anime not found</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useAnimeStore } from '@/stores/animeStore'
import type { UserAnimeStatus, AnimeStatus } from '@/types/anime'
import type { Media, MediaItem } from '@/types/media'
import MediaDetailHero from '@/components/media-detail/MediaDetailHero.vue'
import MediaDetailInfo from '@/components/media-detail/MediaDetailInfo.vue'
import MediaDetailCharacters from '@/components/media-detail/MediaDetailCharacters.vue'
import MediaDetailProgress from '@/components/media-detail/MediaDetailProgress.vue'
import MediaDetailSimilar from '@/components/media-detail/MediaDetailSimilar.vue'

export default defineComponent({
  name: 'AnimeDetailView',

  components: {
    MediaDetailHero,
    MediaDetailInfo,
    MediaDetailCharacters,
    MediaDetailProgress,
    MediaDetailSimilar,
  },

  data() {
    const store = useAnimeStore()
    return {
      animeStore: store,
      route: useRoute(),
      loading: true,
      updating: false,
      progressModel: {
        status: 'watching' as UserAnimeStatus,
        progress: 0,
      },
    }
  },

  computed: {
    mappedAnime(): Media | null {
      if (!this.animeStore.currentAnime) return null

      return {
        id: this.animeStore.currentAnime.id,
        title: this.animeStore.currentAnime.title,
        japanese_title: this.animeStore.currentAnime.japanese_title,
        image_url: this.animeStore.currentAnime.image_url || '',
        cover_image_url: this.animeStore.currentAnime.cover_image_url || '',
        synopsis: this.animeStore.currentAnime.synopsis,
        status: this.animeStore.currentAnime.status as AnimeStatus,
        episodes: this.animeStore.currentAnime.episodes,
        season: this.animeStore.currentAnime.season,
        year: this.animeStore.currentAnime.year,
        rating: this.animeStore.currentAnime.rating || 0,
        genres:
          this.animeStore.currentAnime.genres?.map((g) => ({
            id: g.genres.id,
            name: g.genres.name,
          })) || [],
      }
    },

    similarAnime(): MediaItem[] {
      if (!this.animeStore.currentAnime) return []

      return this.animeStore.animeList
        .filter(
          (anime) =>
            anime.id !== this.animeStore.currentAnime?.id &&
            anime.genres?.some((genreRelation) =>
              this.animeStore.currentAnime?.genres?.some(
                (g) => g.genres.id === genreRelation.genres.id,
              ),
            ),
        )
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5)
        .map((anime) => ({
          id: anime.id,
          title: anime.title,
          image_url: anime.image_url || '',
          rating: anime.rating || 0,
        }))
    },
  },

  methods: {
    async initialize() {
      this.loading = true
      try {
        await this.animeStore.fetchAnimeDetails(Number(this.route.params.id))

        // Load user's progress if they have any
        const userAnime = this.animeStore.userAnimeList.find(
          (item) => item.anime_id === Number(this.route.params.id),
        )

        if (userAnime) {
          this.progressModel.status = userAnime.status
          this.progressModel.progress = userAnime.episodes_watched
        }
      } catch (error) {
        console.error('Error loading anime details:', error)
      } finally {
        this.loading = false
      }
    },

    async updateProgress() {
      this.updating = true
      try {
        await this.animeStore.updateUserAnimeStatus(
          Number(this.route.params.id),
          this.progressModel.status,
          this.progressModel.progress,
        )
      } catch (error) {
        console.error('Error updating progress:', error)
      } finally {
        this.updating = false
      }
    },
  },

  mounted() {
    this.initialize()
  },

  watch: {
    'route.params.id': {
      handler: 'initialize',
      immediate: true,
    },
  },
})
</script>

<style scoped>
.anime-detail {
  background: #121212;
  min-height: 100vh;
  color: white;
}
</style>
