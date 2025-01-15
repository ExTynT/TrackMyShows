<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 mb-6">{{ type === 'anime' ? 'Anime' : 'Manga' }} Reviews</h2>
      </v-col>
    </v-row>

    <!-- Review Form -->
    <v-row v-if="isAuthenticated">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-form @submit.prevent="submitReview">
            <v-select
              v-model="selectedMediaId"
              :items="mediaList"
              item-title="title"
              item-value="id"
              :label="`Select ${type === 'anime' ? 'Anime' : 'Manga'}`"
              class="mb-4"
              required
            ></v-select>

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

            <v-textarea
              v-model="newReview.content"
              label="Write your review"
              rows="3"
              class="mb-4"
              required
            ></v-textarea>

            <v-btn type="submit" color="primary" :loading="submitting" :disabled="!isFormValid">
              Submit Review
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- Login Prompt -->
    <v-row v-else>
      <v-col cols="12">
        <v-alert type="info" text="Please log in to write a review" class="mb-6"></v-alert>
      </v-col>
    </v-row>

    <!-- Reviews List -->
    <v-row>
      <v-col cols="12">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          class="ma-4"
        ></v-progress-circular>

        <template v-else>
          <v-card v-for="review in reviews" :key="review.id" class="mb-4 pa-4">
            <div class="d-flex justify-space-between align-center mb-2">
              <h3 class="text-h6">{{ review.media.title }}</h3>
              <span class="text-caption">{{ formatDate(review.created_at) }}</span>
            </div>

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

            <p class="text-body-1">{{ review.content }}</p>
          </v-card>

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
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useAnimeStore } from '@/stores/animeStore'
import { useMangaStore } from '@/stores/mangaStore'
import { supabase } from '@/lib/supabase'
import type { ReviewWithMedia } from '@/types/reviews'

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

export default defineComponent({
  name: 'MediaReviews',
  props: {
    type: {
      type: String as () => 'anime' | 'manga',
      required: true,
    },
  },
  setup(props) {
    const animeStore = useAnimeStore()
    const mangaStore = useMangaStore()
    const reviews = ref<ReviewWithMedia[]>([])
    const loading = ref(false)
    const submitting = ref(false)
    const isAuthenticated = ref(false)
    const selectedMediaId = ref<number | null>(null)
    const newReview = ref({
      rating: 0,
      content: '',
      user_id: '',
    })

    const checkAuthStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      isAuthenticated.value = !!user
    }

    const isFormValid = computed(() => {
      return (
        selectedMediaId.value !== null &&
        newReview.value.rating > 0 &&
        newReview.value.content.trim().length > 0
      )
    })

    const mediaList = computed(() => {
      return props.type === 'anime' ? animeStore.animeList : mangaStore.mangaList
    })

    const getMediaTitle = (mediaId: number) => {
      const media = mediaList.value.find((m) => m.id === mediaId)
      return media?.title || `Unknown ${props.type}`
    }

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString()
    }

    const fetchReviews = async () => {
      loading.value = true
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
            ${props.type === 'anime' ? 'anime' : 'manga'} (
              id,
              title,
              image_url
            )
          `,
          )
          .eq('type', props.type)
          .order('created_at', { ascending: false })

        if (error) throw error

        // Transform the data to match ReviewWithMedia type
        reviews.value = (data as unknown as ReviewResponse[])?.map((review) => ({
          ...review,
          media: review[props.type]!,
        })) as ReviewWithMedia[]
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        loading.value = false
      }
    }

    const submitReview = async () => {
      if (!isFormValid.value || !isAuthenticated.value) {
        console.log('Form validation failed:', {
          isFormValid: isFormValid.value,
          isAuthenticated: isAuthenticated.value,
        })
        return
      }

      submitting.value = true
      console.log('Submitting review...')

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          console.error('No user found')
          return
        }

        console.log('Preparing review data:', {
          [props.type === 'anime' ? 'anime_id' : 'manga_id']: selectedMediaId.value,
          user_id: user.id,
          rating: newReview.value.rating,
          content: newReview.value.content,
          type: props.type,
        })

        const { data, error } = await supabase
          .from('anime_reviews')
          .insert({
            [props.type === 'anime' ? 'anime_id' : 'manga_id']: selectedMediaId.value,
            user_id: user.id,
            rating: newReview.value.rating,
            content: newReview.value.content,
            type: props.type,
          })
          .select()

        if (error) {
          console.error('Error inserting review:', error)
          throw error
        }

        console.log('Review inserted successfully:', data)
        await fetchReviews()

        // Reset form
        selectedMediaId.value = null
        newReview.value = {
          rating: 0,
          content: '',
          user_id: '',
        }
      } catch (error) {
        console.error('Error in submitReview:', error)
      } finally {
        submitting.value = false
      }
    }

    onMounted(async () => {
      await checkAuthStatus()
      fetchReviews()
      if (props.type === 'anime') {
        animeStore.fetchAnimeList()
      } else {
        mangaStore.fetchMangaList()
      }
    })

    return {
      reviews,
      loading,
      submitting,
      newReview,
      selectedMediaId,
      isAuthenticated,
      isFormValid,
      mediaList,
      getMediaTitle,
      formatDate,
      submitReview,
    }
  },
})
</script>

<style scoped>
.v-rating {
  display: inline-flex;
}
</style>
