<!-- Karta pre zobrazenie média v mriežke -->
<template>
  <!-- Efekt pri prejdení myšou -->
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      :elevation="isHovering ? 8 : 2"
      :class="{ 'on-hover': isHovering }"
      v-bind="props"
      @click="handleClick"
    >
      <!-- Obrázok s titulkom -->
      <v-img :src="item.image_url" height="350" cover class="align-end">
        <v-card-title class="text-white bg-black bg-opacity-50">
          {{ item.title }}
        </v-card-title>
      </v-img>
      <!-- Detaily média -->
      <v-card-text>
        <!-- Hodnotenie -->
        <div class="d-flex align-center mb-2">
          <v-rating
            :model-value="item.rating"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          ></v-rating>
          <span class="text-grey-darken-2 ms-2">{{ item.rating }}/5</span>
        </div>
        <!-- Žánre -->
        <div class="d-flex flex-wrap gap-1">
          <v-chip v-for="genre in item.genres" :key="genre.id" size="small" class="me-1 mb-1">
            {{ genre.name }}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
// Importy potrebných závislostí
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

// Rozhrania pre typy dát
export interface Genre {
  id: number
  name: string
}

export interface MediaGridItem {
  id: number
  title: string
  image_url: string
  rating: number
  genres: Genre[]
}

export default defineComponent({
  name: 'MediaGridCard',

  // Vlastnosti komponentu
  props: {
    // Položka média (anime/manga)
    item: {
      type: Object as () => MediaGridItem,
      required: true,
    },
    // Typ média (anime/manga)
    type: {
      type: String as () => 'anime' | 'manga',
      required: true,
    },
  },

  // Základný stav komponentu
  data() {
    return {
      router: useRouter(),
    }
  },

  // Metódy komponentu
  methods: {
    // Presmerovanie na detail položky
    handleClick() {
      this.router.push(`/${this.type}/${this.item.id}`)
    },
  },
})
</script>

<style scoped>
.on-hover {
  transform: translateY(-4px);
  transition: all 0.3s ease;
}

.v-card {
  cursor: pointer;
}

.gap-1 {
  gap: 0.25rem;
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
