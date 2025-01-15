<template>
  <section class="carousel-section">
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="loader"
    ></v-progress-circular>
    <v-carousel v-else cycle height="600" hide-delimiter-background show-arrows="hover">
      <v-carousel-item v-for="slide in slides" :key="slide.id">
        <v-img :src="slide.cover_image_url" height="600" cover>
          <div class="carousel-content">
            <v-container>
              <v-row align="center" style="height: 100%">
                <v-col cols="12" md="6">
                  <h2 class="carousel-title">{{ slide.title }}</h2>
                  <p class="carousel-description">{{ slide.description }}</p>
                  <div class="d-flex align-center mb-4">
                    <v-rating
                      v-model="slide.rating"
                      color="amber"
                      half-increments
                      readonly
                      size="small"
                    ></v-rating>
                    <span class="text-white ms-2">{{ slide.rating }}/5</span>
                  </div>
                  <v-btn
                    color="primary"
                    size="large"
                    :to="`/${type}/${slide.id}`"
                    class="text-capitalize"
                    :prepend-icon="actionIcon"
                  >
                    {{ actionText }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { CarouselSlide } from '@/types/carousel'

export default defineComponent({
  name: 'MediaHeroCarousel',

  props: {
    type: {
      type: String as () => 'anime' | 'manga',
      required: true,
      validator: (value: string) => ['anime', 'manga'].includes(value),
    },
    slides: {
      type: Array as () => CarouselSlide[],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    actionIcon(): string {
      return this.type === 'anime' ? 'mdi-play' : 'mdi-book-open-variant'
    },
    actionText(): string {
      return this.type === 'anime' ? 'Watch Now' : 'Read Now'
    },
  },
})
</script>

<style scoped>
.carousel-section {
  margin-bottom: 40px;
  overflow: hidden;
}

.loader {
  display: block;
  margin: 40px auto;
}

.carousel-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
  color: white;
  display: flex;
  align-items: center;
}

.carousel-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
}

.carousel-description {
  font-size: 18px;
  margin-bottom: 24px;
  max-width: 600px;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  opacity: 0.9;
}

.v-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 0 32px;
  height: 48px;
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
    font-size: 32px;
  }

  .carousel-description {
    font-size: 16px;
  }
}
</style>
