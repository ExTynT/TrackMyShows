<template>
  <div v-if="loading" class="d-flex justify-center align-center" style="min-height: 400px">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else-if="mappedManga" class="manga-detail">
    <!-- Hero Section -->
    <media-detail-hero
      type="manga"
      :media="mappedManga"
      :credits="
        mangaStore.currentManga?.authors?.map((author) => ({
          id: author.id,
          name: author.name,
        })) || []
      "
    />

    <v-container class="py-8">
      <v-row>
        <!-- Main Content -->
        <v-col cols="12" md="8">
          <!-- Details -->
          <media-detail-info
            type="manga"
            :media="mappedManga"
            :credits="
              mangaStore.currentManga?.authors?.map((author) => ({
                id: author.id,
                name: author.name,
              })) || []
            "
          />

          <!-- Characters -->
          <media-detail-characters
            :characters="
              mangaStore.currentManga?.characters?.map((char) => ({
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
            type="manga"
            v-model="progressModel"
            :max-progress="mappedManga.chapters || 0"
            :loading="updating"
            @update="updateProgress"
          />

          <!-- Similar Manga -->
          <media-detail-similar type="manga" :items="similarManga" />
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else class="d-flex justify-center align-center" style="min-height: 400px">
    <div class="text-center">
      <v-icon size="64" color="grey" class="mb-4">mdi-alert</v-icon>
      <h3 class="text-h5 text-grey-darken-1">Manga not found</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useMangaStore } from '@/stores/mangaStore'
import type { UserMangaStatus, MangaStatus } from '@/types/manga'
import type { Media, MediaItem } from '@/types/media'
import MediaDetailHero from '@/components/media-detail/MediaDetailHero.vue'
import MediaDetailInfo from '@/components/media-detail/MediaDetailInfo.vue'
import MediaDetailCharacters from '@/components/media-detail/MediaDetailCharacters.vue'
import MediaDetailProgress from '@/components/media-detail/MediaDetailProgress.vue'
import MediaDetailSimilar from '@/components/media-detail/MediaDetailSimilar.vue'

export default defineComponent({
  name: 'MangaDetailView',

  components: {
    MediaDetailHero,
    MediaDetailInfo,
    MediaDetailCharacters,
    MediaDetailProgress,
    MediaDetailSimilar,
  },

  data() {
    const store = useMangaStore()
    return {
      mangaStore: store,
      route: useRoute(),
      loading: true,
      updating: false,
      progressModel: {
        status: 'reading' as UserMangaStatus,
        progress: 0,
      },
    }
  },

  computed: {
    mappedManga(): Media | null {
      if (!this.mangaStore.currentManga) return null

      return {
        id: this.mangaStore.currentManga.id,
        title: this.mangaStore.currentManga.title,
        japanese_title: this.mangaStore.currentManga.japanese_title,
        image_url: this.mangaStore.currentManga.image_url || '',
        cover_image_url: this.mangaStore.currentManga.cover_image_url || '',
        synopsis: this.mangaStore.currentManga.synopsis,
        status: this.mangaStore.currentManga.status as MangaStatus,
        chapters: this.mangaStore.currentManga.chapters,
        volumes: this.mangaStore.currentManga.volumes,
        year: this.mangaStore.currentManga.year,
        rating: this.mangaStore.currentManga.rating || 0,
        genres:
          this.mangaStore.currentManga.genres?.map((g) => ({
            id: g.id,
            name: g.name,
          })) || [],
      }
    },

    similarManga(): MediaItem[] {
      if (!this.mangaStore.currentManga) return []

      return this.mangaStore.mangaList
        .filter(
          (manga) =>
            manga.id !== this.mangaStore.currentManga?.id &&
            manga.genres?.some((genre) =>
              this.mangaStore.currentManga?.genres?.some((g) => g.id === genre.id),
            ),
        )
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5)
        .map((manga) => ({
          id: manga.id,
          title: manga.title,
          image_url: manga.image_url || '',
          rating: manga.rating || 0,
        }))
    },
  },

  methods: {
    async initialize() {
      this.loading = true
      try {
        await this.mangaStore.fetchMangaDetail(Number(this.route.params.id))

        // Load user's progress if they have any
        const userManga = this.mangaStore.userMangaList.find(
          (item) => item.manga_id === Number(this.route.params.id),
        )

        if (userManga) {
          this.progressModel.status = userManga.status
          this.progressModel.progress = userManga.chapters_read
        }
      } catch (error) {
        console.error('Error loading manga details:', error)
      } finally {
        this.loading = false
      }
    },

    async updateProgress() {
      this.updating = true
      try {
        await this.mangaStore.updateUserMangaStatus(
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
.manga-detail {
  background: #121212;
  min-height: 100vh;
  color: white;
}
</style>
