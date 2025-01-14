<template>
  <div class="anime-view">
    <!-- Hero Section -->
    <AnimeHeroCarousel />

    <!-- Currently Airing Section -->
    <section class="py-8">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">Currently Airing</h2>
        <v-row>
          <v-col v-for="anime in animeStore.airingAnime" :key="anime.id" cols="12" sm="6" md="3">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                :elevation="isHovering ? 8 : 2"
                :class="{ 'on-hover': isHovering }"
                v-bind="props"
                @click="router.push('/anime/' + anime.id)"
              >
                <v-img :src="anime.image_url" height="350" cover class="align-end">
                  <v-card-title class="text-white bg-black bg-opacity-50">
                    {{ anime.title }}
                  </v-card-title>
                </v-img>
                <v-card-text>
                  <div class="d-flex align-center mb-2">
                    <v-rating
                      v-model="anime.rating"
                      color="amber"
                      density="compact"
                      half-increments
                      readonly
                      size="small"
                    ></v-rating>
                    <span class="text-grey-darken-2 ms-2">{{ anime.rating }}/5</span>
                  </div>
                  <div class="d-flex flex-wrap gap-1">
                    <v-chip
                      v-for="genreRelation in anime.genres"
                      :key="genreRelation.genres.id"
                      size="small"
                      class="me-1 mb-1"
                    >
                      {{ genreRelation.genres.name }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Top Rated Section -->
    <section class="py-8 bg-grey-darken-4">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">Top Rated</h2>
        <v-row>
          <v-col v-for="(anime, index) in animeStore.topRatedAnime" :key="anime.id" cols="12">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                :elevation="isHovering ? 8 : 2"
                :class="{ 'on-hover': isHovering }"
                v-bind="props"
                @click="router.push('/anime/' + anime.id)"
              >
                <div class="d-flex">
                  <div class="rank-badge">#{{ index + 1 }}</div>
                  <v-img
                    :src="anime.image_url"
                    height="200"
                    width="200"
                    cover
                    class="top-rated-image"
                  ></v-img>
                  <div class="pa-4 flex-grow-1">
                    <div class="d-flex justify-space-between align-center">
                      <h3 class="text-h5 font-weight-bold">{{ anime.title }}</h3>
                      <div class="d-flex align-center">
                        <v-icon color="amber" class="me-1">mdi-star</v-icon>
                        <span class="text-h6">{{ anime.rating }}</span>
                      </div>
                    </div>
                    <p class="mt-2 text-grey">{{ anime.synopsis }}</p>
                    <div class="mt-2">
                      <v-chip
                        v-for="studioRelation in anime.studios"
                        :key="studioRelation.studios.id"
                        class="me-2 studio-chip"
                        color="primary"
                        variant="outlined"
                        size="small"
                      >
                        <v-img
                          :src="studioRelation.studios.logo_url"
                          height="16"
                          width="32"
                          class="me-1"
                          contain
                        ></v-img>
                      </v-chip>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Upcoming Releases -->
    <section class="py-8">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">Upcoming Releases</h2>
        <v-row>
          <v-col v-for="anime in animeStore.upcomingAnime" :key="anime.id" cols="12" sm="6" lg="4">
            <v-card @click="router.push('/anime/' + anime.id)" class="upcoming-card">
              <v-img :src="anime.image_url" height="250" cover class="align-end">
                <div class="upcoming-overlay">
                  <div class="pa-4">
                    <h3 class="text-h5 font-weight-bold mb-2">{{ anime.title }}</h3>
                    <p class="mb-2">{{ anime.season }} {{ anime.year }}</p>
                    <div class="d-flex flex-wrap gap-1">
                      <v-chip
                        v-for="genreRelation in anime.genres"
                        :key="genreRelation.genres.id"
                        size="small"
                        class="me-1 mb-1"
                      >
                        {{ genreRelation.genres.name }}
                      </v-chip>
                    </div>
                  </div>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Browse by Genre -->
    <AnimeReviewsSection title="Latest Reviews" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimeStore } from '@/stores/animeStore'
import AnimeHeroCarousel from '@/components/AnimeHeroCarousel.vue'
import AnimeReviewsSection from '@/components/AnimeReviewsSection.vue'

const router = useRouter()
const animeStore = useAnimeStore()

onMounted(async () => {
  if (animeStore.animeList.length === 0) {
    await animeStore.fetchAnimeList()
  }
  await animeStore.fetchGenres()
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
}

.hero-content {
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 60%,
    transparent 100%
  );
  padding: 3rem;
  max-width: 800px;
  color: white;
  border-radius: 8px;
  backdrop-filter: blur(8px);
}

.on-hover {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.on-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.rank-badge {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--v-primary-base);
  color: white;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-bottom-right-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.upcoming-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border-radius: 12px;
}

.upcoming-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.upcoming-overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  padding: 2rem 1.5rem;
  transition: transform 0.3s ease;
}

.upcoming-card:hover .upcoming-overlay {
  transform: translateY(-8px);
}

.genre-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.genre-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.top-rated-image {
  object-fit: cover;
  object-position: center;
  min-width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.d-flex {
  gap: 20px;
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

v-chip {
  transition: all 0.2s ease;
}

v-chip:hover {
  transform: translateY(-2px);
}

.studio-chip {
  height: 24px !important;
  padding: 0 8px;
}

.studio-chip .v-img {
  opacity: 0.9;
}

.studio-chip:hover .v-img {
  opacity: 1;
}
</style>
