<!-- Hlavná sekcia pre carousel -->
<template>
  <section class="carousel-section">
    <!-- Načítavací indikátor -->
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="loader"
    ></v-progress-circular>
    <!-- Carousel s automatickým prehrávaním -->
    <v-carousel v-else cycle height="400" hide-delimiter-background show-arrows="hover">
      <!-- Jednotlivé slidy v carouseli -->
      <v-carousel-item
        v-for="slide in slides"
        :key="slide.id"
        :src="slide.image_url"
        cover
        :to="slide.type === 'anime' ? `/anime/${slide.content_id}` : slide.link"
        style="cursor: pointer"
      >
        <!-- Obsah slidu -->
        <div class="carousel-content">
          <h2 class="carousel-title">{{ slide.title }}</h2>
          <p class="carousel-description">{{ slide.description }}</p>
        </div>
      </v-carousel-item>
    </v-carousel>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCarouselStore } from '@/stores/carousel'
import type { HomeCarouselSlide } from '@/types/carousel'

export default defineComponent({
  name: 'HeroCarousel',

  // Základný stav komponentu
  data() {
    const store = useCarouselStore()
    return {
      carouselStore: store,
      slides: [] as HomeCarouselSlide[],
      loading: true,
    }
  },

  methods: {
    // Načítanie slidov z databázy
    async fetchData() {
      this.loading = true
      try {
        await this.carouselStore.fetchSlides()
        this.slides = this.carouselStore.slides
      } catch (error) {
        console.error('Error fetching slides:', error)
      } finally {
        this.loading = false
      }
    },
  },

  // Načítanie dát pri vytvorení komponentu
  mounted() {
    this.fetchData()
  },
})
</script>

<style scoped>
.carousel-section {
  margin-bottom: 40px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.loader {
  display: block;
  margin: 40px auto;
}

.carousel-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 48px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  color: white;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.carousel-title {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 12px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
}

.carousel-description {
  font-size: 18px;
  margin-bottom: 20px;
  max-width: 700px;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .carousel-content {
    padding: 32px;
  }

  .carousel-title {
    font-size: 28px;
  }

  .carousel-description {
    font-size: 16px;
  }
}
</style>
