<template>
  <v-card v-if="blog" class="blog-content pa-6" elevation="0" rounded="lg">
    <v-img
      v-if="blog.image_url"
      :src="blog.image_url"
      :alt="blog.title"
      class="mb-6 rounded-lg"
      height="400"
      cover
    ></v-img>

    <h1 class="text-h4 font-weight-bold mb-4 primary--text">{{ blog.title }}</h1>

    <div class="d-flex align-center mb-6">
      <v-icon icon="mdi-account" class="mr-2" color="grey"></v-icon>
      <span class="text-grey mr-6">{{ blog.author }}</span>
      <v-icon icon="mdi-calendar" class="mr-2" color="grey"></v-icon>
      <span class="text-grey">{{ formatDate(blog.date) }}</span>
    </div>

    <v-divider class="mb-6"></v-divider>

    <div class="text-subtitle-1 mb-4 text-grey-darken-3">{{ blog.content }}</div>

    <div class="blog-content__body text-body-1" v-html="blog.full_content"></div>
  </v-card>
  <v-skeleton-loader v-else type="article" class="mt-4"></v-skeleton-loader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { BlogPost } from '@/stores/blog'

export default defineComponent({
  name: 'BlogContent',

  props: {
    blog: {
      type: Object as () => BlogPost | null,
      required: false,
      default: null,
    },
  },

  methods: {
    formatDate(dateString: string): string {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return new Date(dateString).toLocaleDateString('en-US', options)
    },
  },
})
</script>

<style scoped>
.blog-content {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.02);
}

.blog-content__body {
  line-height: 1.9;
  color: #37474f;
  font-size: 1.1rem;
  letter-spacing: 0.3px;
}

.blog-content__body :deep(p) {
  margin-bottom: 1.8rem;
}

.blog-content__body :deep(h2) {
  font-size: 2rem;
  font-weight: 700;
  margin: 3rem 0 1.5rem;
  color: #1a237e;
  letter-spacing: -0.5px;
  line-height: 1.3;
}

.blog-content__body :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2.5rem 0 1.2rem;
  color: #283593;
  letter-spacing: -0.3px;
  line-height: 1.4;
}

.blog-content__body :deep(ul),
.blog-content__body :deep(ol) {
  margin: 1.5rem 0;
  padding-left: 2.5rem;
}

.blog-content__body :deep(li) {
  margin-bottom: 0.8rem;
  line-height: 1.7;
}

.blog-content__body :deep(a) {
  color: var(--v-primary-base);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
  font-weight: 500;
}

.blog-content__body :deep(a:hover) {
  border-color: var(--v-primary-base);
  opacity: 0.9;
}

.blog-content__body :deep(blockquote) {
  margin: 2rem 0;
  padding: 1.5rem 2rem;
  border-left: 4px solid #1a237e;
  background: rgba(26, 35, 126, 0.05);
  font-style: italic;
  color: #37474f;
  border-radius: 0 8px 8px 0;
}

.blog-content__body :deep(code) {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Fira Code', monospace;
  color: #37474f;
}

.blog-content__body :deep(pre) {
  background: rgba(0, 0, 0, 0.03);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #37474f;
}

.blog-content__body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
</style>
