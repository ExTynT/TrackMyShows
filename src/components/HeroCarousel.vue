<template>
  <section class="carousel-section">
    <v-progress-circular
      v-if="carouselStore.loading"
      indeterminate
      color="primary"
      class="loader"
    ></v-progress-circular>
    <v-carousel v-else cycle height="400" hide-delimiter-background show-arrows="hover">
      <v-carousel-item
        v-for="slide in carouselStore.slides"
        :key="slide.id"
        :src="slide.image_url"
        cover
      >
        <div class="carousel-content">
          <h2 class="carousel-title">{{ slide.title }}</h2>
          <p class="carousel-description">{{ slide.description }}</p>
          <v-btn color="primary" variant="flat">
            {{ slide.button_text }}
          </v-btn>
        </div>
      </v-carousel-item>
    </v-carousel>
  </section>
</template>

<script setup lang="ts">
import { useCarouselStore } from '@/stores/carousel'
import { onMounted } from 'vue'

const carouselStore = useCarouselStore()

onMounted(() => {
  carouselStore.fetchSlides()
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

.v-btn {
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  padding: 0 24px;
  height: 44px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.v-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
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
