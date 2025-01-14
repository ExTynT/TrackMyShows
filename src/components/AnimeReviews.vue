<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 mb-6">Anime Reviews</h2>
      </v-col>
    </v-row>

    <!-- Add Review Form -->
    <v-row v-if="isAuthenticated">
      <v-col cols="12">
        <v-card class="pa-4 mb-6">
          <v-form @submit.prevent="submitReview">
            <v-select
              v-model="newReview.anime_id"
              :items="animeList"
              item-title="title"
              item-value="id"
              label="Select Anime"
              required
            ></v-select>

            <v-rating
              v-model="newReview.rating"
              color="yellow-darken-3"
              hover
              length="5"
              size="large"
              class="my-4"
            ></v-rating>

            <v-textarea
              v-model="newReview.content"
              label="Your Review"
              required
              rows="4"
              class="mb-4"
            ></v-textarea>

            <v-btn type="submit" color="primary" :loading="submitting" :disabled="!isFormValid">
              Submit Review
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- Reviews List -->
    <v-row>
      <v-col v-for="review in reviews" :key="review.id" cols="12" md="6">
        <v-card class="mb-4">
          <v-card-item>
            <v-card-title>{{ getAnimeName(review.anime_id) }}</v-card-title>
            <v-rating
              :model-value="review.rating"
              color="yellow-darken-3"
              readonly
              size="small"
              class="my-2"
            ></v-rating>
          </v-card-item>

          <v-card-text>
            <p class="text-body-1">{{ review.content }}</p>
            <p class="text-caption text-grey">
              Posted by {{ review.user_id }} on {{ formatDate(review.created_at) }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Login Prompt -->
    <v-row v-if="!isAuthenticated">
      <v-col cols="12" class="text-center">
        <v-alert
          type="info"
          text="Please log in to submit reviews"
          class="mx-auto"
          max-width="500"
        ></v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAnimeStore } from '@/stores/animeStore'
import { supabase } from '@/lib/supabase'
import type { AnimeReview } from '@/types/anime'

const animeStore = useAnimeStore()
const reviews = ref<AnimeReview[]>([])
const submitting = ref(false)

const newReview = ref({
  anime_id: null as number | null,
  rating: 0,
  content: '',
})

const isAuthenticated = computed(() => {
  return supabase.auth.getUser() !== null
})

const isFormValid = computed(() => {
  return (
    newReview.value.anime_id &&
    newReview.value.rating > 0 &&
    newReview.value.content.trim().length > 0
  )
})

const animeList = computed(() => {
  return animeStore.animeList
})

async function fetchReviews() {
  try {
    const { data, error } = await supabase
      .from('anime_reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    reviews.value = data
  } catch (err) {
    console.error('Error fetching reviews:', err)
  }
}

async function submitReview() {
  if (!isFormValid.value) return

  try {
    submitting.value = true
    const user = await supabase.auth.getUser()
    if (!user.data.user) throw new Error('Not authenticated')

    const { error } = await supabase.from('anime_reviews').insert({
      anime_id: newReview.value.anime_id,
      user_id: user.data.user.id,
      rating: newReview.value.rating,
      content: newReview.value.content,
    })

    if (error) throw error

    // Reset form
    newReview.value = {
      anime_id: null,
      rating: 0,
      content: '',
    }

    // Refresh reviews
    await fetchReviews()
  } catch (err) {
    console.error('Error submitting review:', err)
  } finally {
    submitting.value = false
  }
}

function getAnimeName(animeId: number) {
  const anime = animeStore.animeList.find((a) => a.id === animeId)
  return anime?.title || 'Unknown Anime'
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString()
}

onMounted(async () => {
  if (animeStore.animeList.length === 0) {
    await animeStore.fetchAnimeList()
  }
  await fetchReviews()
})
</script>

<style scoped>
.v-rating {
  display: inline-flex;
}
</style>
