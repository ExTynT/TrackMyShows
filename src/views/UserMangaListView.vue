<template>
  <div class="user-manga-list">
    <v-container class="py-12">
      <!-- Header Section -->
      <div class="header-section mb-12">
        <div class="d-flex align-center justify-space-between mb-3">
          <h1 class="text-h3 font-weight-bold">My Manga List</h1>
          <v-btn-group>
            <v-btn :color="'primary'" variant="outlined" class="text-none" :to="'/user/anime'">
              <v-icon start>mdi-television-classic</v-icon>
              Anime
            </v-btn>
            <v-btn :color="'primary'" variant="tonal" class="text-none" :to="'/user/manga'">
              <v-icon start>mdi-book-open-variant</v-icon>
              Manga
            </v-btn>
          </v-btn-group>
        </div>
        <div class="text-subtitle-1 text-grey">Track and manage your manga reading progress</div>
      </div>

      <!-- Status Tabs -->
      <v-card class="mb-8" variant="flat">
        <MediaStatusTabs v-model="selectedStatus" :tabs="tabs" />
      </v-card>

      <!-- Statistics -->
      <v-card class="mb-8" variant="flat">
        <MediaStatistics
          type="manga"
          :total-items="totalManga"
          :total-episodes-or-chapters="totalChaptersRead"
          :average-rating="averageRating"
          :completion-rate="completionRate"
        />
      </v-card>

      <!-- Loading State -->
      <v-row v-if="store.loading">
        <v-col cols="12" class="d-flex justify-center align-center" style="min-height: 400px">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        </v-col>
      </v-row>

      <!-- Content -->
      <template v-else>
        <v-row v-if="displayedMangaList.length > 0">
          <v-col v-for="item in displayedMangaList" :key="item.id" cols="12">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :elevation="isHovering ? 8 : 2"
                :class="{ 'on-hover': isHovering }"
                class="transition-swing"
              >
                <div class="d-flex">
                  <!-- Image Section -->
                  <div
                    class="media-image-container"
                    style="cursor: pointer"
                    @click="router.push(`/manga/${item.manga.id}`)"
                  >
                    <v-img
                      :src="item.manga.image_url"
                      width="180"
                      height="250"
                      cover
                      class="rounded-lg"
                    ></v-img>
                  </div>

                  <!-- Content Section -->
                  <div class="flex-grow-1 pa-4">
                    <!-- Title and Info -->
                    <div class="d-flex flex-column">
                      <h3 class="text-h5 font-weight-bold mb-2">{{ item.manga.title }}</h3>
                      <v-textarea
                        v-model="item.notes"
                        label="Notes"
                        variant="outlined"
                        density="comfortable"
                        rows="2"
                        hide-details
                        class="mb-4"
                        placeholder="Add your notes here..."
                        @change="updateNotes(item)"
                      ></v-textarea>

                      <!-- Genres -->
                      <div class="mb-4">
                        <v-chip
                          v-for="genre in item.manga.genres"
                          :key="genre.id"
                          size="small"
                          class="mr-2 mb-2"
                          variant="outlined"
                        >
                          {{ genre.name }}
                        </v-chip>
                      </div>

                      <!-- Rating -->
                      <div class="d-flex align-center mb-4">
                        <v-rating
                          v-model="item.rating"
                          color="amber"
                          half-increments
                          density="compact"
                          size="small"
                          @update:model-value="updateRating(item, Number($event))"
                        ></v-rating>
                        <span class="text-body-2 text-grey-lighten-1 ml-2"
                          >{{ item.rating || 0 }}/5</span
                        >
                      </div>

                      <!-- Progress -->
                      <div class="d-flex align-center">
                        <v-btn
                          icon="mdi-minus"
                          variant="text"
                          density="comfortable"
                          :disabled="item.chapters_read <= 0"
                          @click="updateChapters(item, -1)"
                        ></v-btn>
                        <div class="mx-4">
                          <span class="text-h6">{{ item.chapters_read }}</span>
                          <span class="text-subtitle-1 text-grey">
                            / {{ item.manga.chapters || '?' }} Chapters
                          </span>
                        </div>
                        <v-btn
                          icon="mdi-plus"
                          variant="text"
                          density="comfortable"
                          :disabled="
                            !!(item.manga.chapters && item.chapters_read >= item.manga.chapters)
                          "
                          @click="updateChapters(item, 1)"
                        ></v-btn>

                        <!-- Status and Favorite Menu -->
                        <v-menu>
                          <template v-slot:activator="{ props }">
                            <v-btn
                              icon="mdi-dots-vertical"
                              variant="text"
                              v-bind="props"
                              class="ml-2"
                            ></v-btn>
                          </template>
                          <v-list>
                            <v-list-subheader>Status</v-list-subheader>
                            <v-list-item
                              v-for="tab in tabs"
                              :key="tab.value"
                              :value="tab.value"
                              @click="
                                tab.value !== 'favorites'
                                  ? updateStatus(item, tab.value as UserMangaStatus)
                                  : toggleFavorite(item)
                              "
                            >
                              <template v-slot:prepend>
                                <v-icon :icon="tab.icon"></v-icon>
                              </template>
                              <v-list-item-title>{{ tab.label }}</v-list-item-title>
                              <template v-slot:append>
                                <v-icon
                                  v-if="
                                    tab.value === 'favorites'
                                      ? item.favorite
                                      : item.status === tab.value
                                  "
                                  :color="tab.value === 'favorites' ? 'error' : 'primary'"
                                  icon="mdi-check"
                                ></v-icon>
                              </template>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item @click="toggleFavorite(item)">
                              <template v-slot:prepend>
                                <v-icon
                                  :icon="item.favorite ? 'mdi-heart' : 'mdi-heart-outline'"
                                ></v-icon>
                              </template>
                              <v-list-item-title>Favorite</v-list-item-title>
                              <template v-slot:append>
                                <v-icon
                                  v-if="item.favorite"
                                  color="error"
                                  icon="mdi-check"
                                ></v-icon>
                              </template>
                            </v-list-item>
                          </v-list>
                        </v-menu>

                        <!-- Remove Button -->
                        <v-spacer></v-spacer>
                        <v-btn
                          color="error"
                          variant="text"
                          prepend-icon="mdi-delete"
                          @click="removeFromList(item)"
                        >
                          Remove
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <!-- Empty State -->
        <v-row v-else>
          <v-col cols="12">
            <v-card class="pa-12 text-center" variant="flat">
              <v-icon size="64" color="grey" class="mb-4">mdi-playlist-remove</v-icon>
              <h2 class="text-h5 text-grey-darken-1 mb-2">No manga in this list yet</h2>
              <p class="text-body-1 text-grey mb-6">
                Start adding manga to your list to track your progress
              </p>
              <v-btn color="primary" prepend-icon="mdi-plus" @click="router.push('/manga')">
                Add Manga
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useUserMangaListStore } from '../stores/userMangaListStore'
import { useMangaListActions } from '../composables/useMangaListActions'
import MediaStatusTabs from '../components/common/MediaStatusTabs.vue'
import MediaStatistics from '../components/common/MediaStatistics.vue'
import type { UserMangaListItem, UserMangaStatus } from '../types/manga'

export default defineComponent({
  name: 'UserMangaListView',

  components: {
    MediaStatusTabs,
    MediaStatistics,
  },

  data() {
    return {
      store: useUserMangaListStore(),
      actions: useMangaListActions(),
      router: useRouter(),
      selectedStatus: 'reading',
      tabs: [
        { label: 'Reading', value: 'reading' as UserMangaStatus, icon: 'mdi-book-open-variant' },
        { label: 'Completed', value: 'completed' as UserMangaStatus, icon: 'mdi-check-circle' },
        { label: 'On Hold', value: 'on_hold' as UserMangaStatus, icon: 'mdi-pause-circle' },
        { label: 'Plan to Read', value: 'plan_to_read' as UserMangaStatus, icon: 'mdi-clock' },
        { label: 'Dropped', value: 'dropped' as UserMangaStatus, icon: 'mdi-close-circle' },
        { label: 'Favorites', value: 'favorites', icon: 'mdi-heart' },
      ],
    }
  },

  computed: {
    displayedMangaList() {
      if (this.selectedStatus === 'favorites') {
        return this.store.list.filter((item: UserMangaListItem) => item.favorite)
      }
      return this.store.list.filter(
        (item: UserMangaListItem) => item.status === this.selectedStatus,
      )
    },

    totalManga() {
      return this.store.list.length
    },

    totalChaptersRead() {
      return this.store.list.reduce(
        (sum: number, item: UserMangaListItem) => sum + item.chapters_read,
        0,
      )
    },

    averageRating() {
      const ratedManga = this.store.list.filter((item: UserMangaListItem) => item.rating)
      if (!ratedManga.length) return 0
      return (
        ratedManga.reduce((sum: number, item: UserMangaListItem) => sum + (item.rating || 0), 0) /
        ratedManga.length
      )
    },

    completionRate() {
      const completed = this.store.list.filter(
        (item: UserMangaListItem) => item.status === 'completed',
      ).length
      return this.totalManga ? (completed / this.totalManga) * 100 : 0
    },
  },

  methods: {
    async updateChapters(item: UserMangaListItem, change: number) {
      const newCount = item.chapters_read + change
      await this.actions.updateChapters(item.manga_id, newCount)

      // Auto-complete when reaching last chapter
      if (newCount === item.manga.chapters && item.status !== 'completed') {
        await this.actions.updateStatus(item.manga_id, 'completed')
      }
      // Change back to reading when decreasing from max chapters
      else if (newCount < item.manga.chapters && item.status === 'completed') {
        await this.actions.updateStatus(item.manga_id, 'reading')
      }
    },

    async updateNotes(item: UserMangaListItem) {
      await this.actions.updateNotes(item.manga_id, item.notes || '')
    },

    async updateRating(item: UserMangaListItem, rating: number) {
      await this.actions.updateRating(item.manga_id, rating)
    },

    async removeFromList(item: UserMangaListItem) {
      if (confirm('Are you sure you want to remove this manga from your list?')) {
        await this.actions.removeFromList(item.manga_id)
      }
    },

    async updateStatus(item: UserMangaListItem, status: UserMangaStatus) {
      await this.actions.updateStatus(item.manga_id, status)
    },

    async toggleFavorite(item: UserMangaListItem) {
      await this.actions.toggleFavorite(item.manga_id)
    },
  },

  async created() {
    try {
      await this.store.fetchUserList()
    } catch (error) {
      console.error('Error fetching user manga list:', error)
    }
  },

  async mounted() {
    if (this.store.list.length === 0) {
      await this.store.fetchUserList()
    }
  },
})
</script>

<style scoped>
.user-manga-list {
  min-height: 100vh;
  background: #121212;
  color: white;
}

.header-section {
  position: relative;
}

.header-section::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--v-primary-base);
  border-radius: 2px;
}

.media-image-container {
  flex-shrink: 0;
  width: 180px;
  height: 250px;
  overflow: hidden;
}

.on-hover {
  transform: translateY(-4px);
}

.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

:deep(.v-card) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.v-btn) {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>
