<template>
  <div class="blog-detail">
    <v-progress-circular
      v-if="blogStore.loading"
      indeterminate
      color="primary"
      class="loader"
    ></v-progress-circular>

    <template v-else-if="blogStore.currentPost">
      <div class="breadcrumb">
        <router-link to="/" class="home-link">Home</router-link>
        <span class="separator">/</span>
        <router-link to="/blog" class="home-link">Blog</router-link>
        <span class="separator">/</span>
        <span>{{ blogStore.currentPost.title }}</span>
      </div>

      <div class="blog-header">
        <div class="header-content">
          <h1 class="text-h3 font-weight-bold mb-4">{{ blogStore.currentPost.title }}</h1>
          <div class="d-flex align-center">
            <v-avatar color="primary" size="40" class="me-3">
              <span class="text-h6">{{ getInitials(blogStore.currentPost.author) }}</span>
            </v-avatar>
            <div>
              <div class="text-body-1">{{ blogStore.currentPost.author }}</div>
              <div class="text-caption text-grey">
                {{ formatDate(blogStore.currentPost.date) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <v-img
        :src="blogStore.currentPost.image_url"
        height="400"
        class="rounded-lg mb-8"
        cover
      ></v-img>

      <div class="blog-content" v-html="blogStore.currentPost.full_content"></div>
    </template>

    <div v-else class="text-center py-12">
      <v-icon size="64" color="grey" class="mb-4">mdi-alert</v-icon>
      <h3 class="text-h5 text-grey-darken-1">Post not found</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBlogStore } from '@/stores/blog'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'BlogDetailView',

  data() {
    return {
      route: useRoute(),
      blogStore: useBlogStore(),
    }
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

    getInitials(name: string): string {
      return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    },
  },

  async mounted() {
    const id = parseInt(this.route.params.id as string)
    await this.blogStore.fetchPostDetail(id)
  },
})
</script>

<style scoped>
.blog-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 90vh;
}

.loader {
  display: block;
  margin: 40px auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.home-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.home-link:hover {
  color: var(--v-primary-base);
}

.separator {
  opacity: 0.5;
  font-size: 18px;
}

.blog-header {
  margin-bottom: 48px;
}

.header-content {
  text-align: left;
}

:deep(.blog-content) {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.87);
}

:deep(.blog-content p) {
  margin-bottom: 1.5rem;
}

:deep(.blog-content h2) {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: var(--v-primary-base);
}

:deep(.blog-content h3) {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: var(--v-primary-lighten-1);
}

:deep(.blog-content ul),
:deep(.blog-content ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

:deep(.blog-content li) {
  margin-bottom: 0.5rem;
}

:deep(.blog-content img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 2rem 0;
}

:deep(.blog-content blockquote) {
  margin: 2rem 0;
  padding: 1rem 2rem;
  border-left: 4px solid var(--v-primary-base);
  background: rgba(var(--v-theme-primary), 0.1);
  font-style: italic;
}

:deep(.blog-content a) {
  color: var(--v-primary-base);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

:deep(.blog-content a:hover) {
  border-color: var(--v-primary-base);
}

@media (max-width: 600px) {
  .blog-detail {
    padding: 20px;
  }

  :deep(.blog-content) {
    font-size: 1rem;
  }

  :deep(.blog-content h2) {
    font-size: 1.6rem;
  }

  :deep(.blog-content h3) {
    font-size: 1.3rem;
  }
}
</style>
