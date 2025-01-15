<template>
  <v-card class="pa-12 text-center">
    <v-icon size="64" color="error" class="mb-4">mdi-alert-circle</v-icon>
    <h2 class="text-h5 text-error-darken-1 mb-2">{{ message || 'Blog post not found' }}</h2>
    <p class="text-body-1 text-grey mb-6">
      {{
        description ||
        'The blog post you are looking for might have been removed or is temporarily unavailable.'
      }}
    </p>
    <v-btn color="primary" to="/blog" prepend-icon="mdi-view-list"> Back to Blog </v-btn>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BlogError',

  props: {
    message: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
  },
})
</script>
