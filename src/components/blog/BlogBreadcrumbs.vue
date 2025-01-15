<template>
  <v-breadcrumbs
    :items="[
      {
        title: 'Home',
        to: '/',
        disabled: false,
      },
      {
        title: 'Blog',
        to: '/blog',
        disabled: false,
      },
    ]"
  >
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right" size="small"></v-icon>
    </template>
    <template v-slot:title="{ item }">
      <v-btn
        :to="item.to"
        variant="text"
        :disabled="item.disabled"
        class="text-none px-1"
        size="small"
        color="primary"
      >
        {{ item.title }}
      </v-btn>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BlogBreadcrumbs',

  props: {
    blogTitle: {
      type: String,
      required: false,
      default: null,
    },
  },
})
</script>
