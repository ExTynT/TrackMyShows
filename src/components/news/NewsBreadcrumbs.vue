<template>
  <v-breadcrumbs :items="breadcrumbItems">
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
import { useNewsStore } from '../../stores/news'

interface BreadcrumbItem {
  title: string
  to: string
  disabled: boolean
}

interface NewsBreadcrumbsState {
  newsStore: ReturnType<typeof useNewsStore>
}

export default defineComponent({
  name: 'NewsBreadcrumbs',

  props: {
    newsTitle: {
      type: String as () => string | null,
      required: false,
      default: null,
    },
  },

  data(): NewsBreadcrumbsState {
    const store = useNewsStore()
    return {
      newsStore: store,
    }
  },

  computed: {
    breadcrumbItems(): BreadcrumbItem[] {
      const items: BreadcrumbItem[] = [
        {
          title: 'Home',
          to: '/',
          disabled: false,
        },
        {
          title: 'News',
          to: '/news',
          disabled: false,
        },
      ]

      if (this.newsTitle || this.newsStore.currentNews?.title) {
        items.push({
          title: this.newsTitle || this.newsStore.currentNews?.title || '',
          to: '',
          disabled: true,
        })
      }

      return items
    },
  },
})
</script>

<style scoped>
.v-breadcrumbs {
  padding: 16px 0;
}
</style>
