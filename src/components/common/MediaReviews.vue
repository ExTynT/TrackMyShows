<!-- Sekcia pre recenzie médií -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 mb-6">{{ type === 'anime' ? 'Anime' : 'Manga' }} Reviews</h2>
      </v-col>
    </v-row>

    <!-- Formulár pre pridanie recenzie -->
    <v-row v-if="isAuthenticated">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-form @submit.prevent="submitReview">
            <!-- Výber média -->
            <v-select
              v-model="selectedMediaId"
              :items="mediaList"
              item-title="title"
              item-value="id"
              :label="`Select ${type === 'anime' ? 'Anime' : 'Manga'}`"
              class="mb-4"
              required
            ></v-select>

            <!-- Hodnotenie -->
            <div class="d-flex align-center mb-4">
              <span class="text-subtitle-1 mr-4">Your Rating:</span>
              <v-rating
                v-model="newReview.rating"
                color="warning"
                hover
                length="5"
                size="large"
              ></v-rating>
              <span class="text-subtitle-1 ml-2">({{ newReview.rating }}/5)</span>
            </div>

            <!-- Text recenzie -->
            <v-textarea
              v-model="newReview.content"
              label="Write your review"
              rows="3"
              class="mb-4"
              required
            ></v-textarea>

            <!-- Tlačidlo na odoslanie -->
            <v-btn type="submit" color="primary" :loading="submitting" :disabled="!isFormValid">
              Submit Review
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- Výzva na prihlásenie -->
    <v-row v-else>
      <v-col cols="12">
        <v-alert type="info" text="Please log in to write a review" class="mb-6"></v-alert>
      </v-col>
    </v-row>

    <!-- Zoznam recenzií -->
    <v-row>
      <v-col cols="12">
        <!-- Načítavací indikátor -->
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          class="ma-4"
        ></v-progress-circular>

        <template v-else>
          <!-- Karta recenzie -->
          <v-card v-for="review in reviews" :key="review.id" class="mb-4 pa-4">
            <!-- Hlavička recenzie -->
            <div class="d-flex justify-space-between align-center mb-2">
              <h3 class="text-h6">{{ review.media.title }}</h3>
              <span class="text-caption">{{ formatDate(review.created_at) }}</span>
            </div>

            <!-- Hodnotenie recenzie -->
            <div class="d-flex align-center mb-2">
              <v-rating
                :model-value="review.rating"
                color="warning"
                readonly
                dense
                half-increments
              ></v-rating>
              <span class="text-subtitle-2 ml-2">({{ review.rating }}/5)</span>
            </div>

            <!-- Text recenzie -->
            <p class="text-body-1">{{ review.content }}</p>
          </v-card>

          <!-- Správa ak nie sú recenzie -->
          <v-alert
            v-if="!loading && reviews.length === 0"
            type="info"
            text="No reviews yet. Be the first to write one!"
            class="mt-4"
          ></v-alert>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
// Importy potrebných závislostí
import { useAnimeStore } from '@/stores/animeStore'
import { useMangaStore } from '@/stores/mangaStore'
import { supabase } from '@/lib/supabase'
import type { PropType } from 'vue'
import type { ReviewWithMedia } from '@/types/reviews'

// Rozhranie pre odpoveď z databázy
interface ReviewResponse {
  id: number
  anime_id: number
  user_id: string
  rating: number
  content: string
  created_at: string
  updated_at: string
  type: 'anime' | 'manga'
  anime?: { id: number; title: string; image_url: string }
  manga?: { id: number; title: string; image_url: string }
}

export default {
  name: 'MediaReviews',

  // Vlastnosti komponentu
  props: {
    // Typ média (anime/manga)
    type: {
      type: String as PropType<'anime' | 'manga'>,
      required: true,
    },
  },

  // Dátový model komponentu
  data() {
    return {
      // Store pre prácu s dátami
      animeStore: useAnimeStore(),
      mangaStore: useMangaStore(),

      // Reaktívne premenné
      reviews: [] as ReviewWithMedia[],
      loading: false,
      submitting: false,
      isAuthenticated: false,
      selectedMediaId: null as number | null,
      newReview: {
        rating: 0,
        content: '',
        user_id: '',
      },
    }
  },

  // Computed vlastnosti
  computed: {
    // Kontrola platnosti formulára
    isFormValid(): boolean {
      return (
        this.selectedMediaId !== null &&
        this.newReview.rating > 0 &&
        this.newReview.content.trim().length > 0
      )
    },

    // Zoznam dostupných médií
    mediaList() {
      return this.type === 'anime' ? this.animeStore.animeList : this.mangaStore.mangaList
    },
  },

  // Metódy komponentu
  methods: {
    // Kontrola prihlásenia používateľa
    async checkAuthStatus() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      this.isAuthenticated = !!user
    },

    // Získanie názvu média
    getMediaTitle(mediaId: number): string {
      const media = this.mediaList.find((m) => m.id === mediaId)
      return media?.title || `Unknown ${this.type}`
    },

    // Formátovanie dátumu
    formatDate(dateString: string): string {
      return new Date(dateString).toLocaleDateString()
    },

    // Načítanie recenzií
    async fetchReviews() {
      this.loading = true
      try {
        const { data, error } = await supabase
          .from('anime_reviews')
          .select(
            `
            id,
            anime_id,
            user_id,
            rating,
            content,
            created_at,
            updated_at,
            type,
            ${this.type === 'anime' ? 'anime' : 'manga'} (
              id,
              title,
              image_url
            )
          `,
          )
          .eq('type', this.type)
          .order('created_at', { ascending: false })

        if (error) throw error

        this.reviews = (data as unknown as ReviewResponse[])?.map((review) => ({
          ...review,
          media: review[this.type]!,
        })) as ReviewWithMedia[]
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        this.loading = false
      }
    },

    // Odoslanie novej recenzie
    async submitReview() {
      if (!this.isFormValid || !this.isAuthenticated) {
        console.log('Form validation failed:', {
          isFormValid: this.isFormValid,
          isAuthenticated: this.isAuthenticated,
        })
        return
      }

      this.submitting = true
      console.log('Submitting review...')

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) throw new Error('User not authenticated')

        const { error } = await supabase.from('anime_reviews').insert({
          type: this.type,
          [`${this.type}_id`]: this.selectedMediaId,
          user_id: user.id,
          rating: this.newReview.rating,
          content: this.newReview.content,
        })

        if (error) throw error

        // Reset formulára
        this.selectedMediaId = null
        this.newReview.rating = 0
        this.newReview.content = ''

        // Obnovenie zoznamu recenzií
        await this.fetchReviews()
      } catch (error) {
        console.error('Error submitting review:', error)
      } finally {
        this.submitting = false
      }
    },
  },

  // Životný cyklus komponentu
  async created() {
    await this.checkAuthStatus()
    await this.fetchReviews()
  },
}
</script>

<style scoped>
.v-rating {
  display: inline-flex;
}
</style>
