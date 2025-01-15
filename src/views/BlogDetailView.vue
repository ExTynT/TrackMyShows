<template>
  <div class="blog-detail">
    <v-container>
      <!-- Loading State -->
      <div
        v-if="blogStore.loading"
        class="d-flex justify-center align-center"
        style="min-height: 400px"
      >
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </div>

      <!-- Error State -->
      <blog-error
        v-else-if="blogStore.error"
        :message="blogStore.error"
        description="There was an error loading the blog post. Please try again later."
      />

      <!-- Content -->
      <template v-else-if="blogStore.currentPost">
        <blog-breadcrumbs :blog-title="blogStore.currentPost.title" />
        <blog-content :blog="blogStore.currentPost" />
      </template>

      <!-- Not Found -->
      <blog-error v-else />
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import BlogBreadcrumbs from '@/components/blog/BlogBreadcrumbs.vue'
import BlogContent from '@/components/blog/BlogContent.vue'
import BlogError from '@/components/blog/BlogError.vue'

export default defineComponent({
  name: 'BlogDetailView',

  components: {
    BlogBreadcrumbs,
    BlogContent,
    BlogError,
  },

  data() {
    return {
      route: useRoute(),
      blogStore: useBlogStore(),
    }
  },

  async mounted() {
    const id = parseInt(this.route.params.id as string)
    await this.blogStore.fetchPostDetail(id)
  },
})
</script>

<style scoped>
.blog-detail {
  min-height: 90vh;
  background: #121212;
  color: white;
}
</style>
