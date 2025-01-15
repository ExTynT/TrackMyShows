<template>
  <div class="d-flex justify-space-between align-center mt-8">
    <v-btn
      v-if="previousBlogId"
      color="primary"
      variant="text"
      :to="`/blog/${previousBlogId}`"
      prepend-icon="mdi-chevron-left"
    >
      Previous
    </v-btn>
    <v-spacer v-else></v-spacer>

    <v-btn
      v-if="nextBlogId"
      color="primary"
      variant="text"
      :to="`/blog/${nextBlogId}`"
      append-icon="mdi-chevron-right"
      class="ml-auto"
    >
      Next
    </v-btn>
    <v-spacer v-else></v-spacer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BlogNavigation',

  props: {
    previousBlogId: {
      type: Number as () => number | null | undefined,
      required: false,
      default: undefined,
    },
    nextBlogId: {
      type: Number as () => number | null | undefined,
      required: false,
      default: undefined,
    },
  },
})
</script>
