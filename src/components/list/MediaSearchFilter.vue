<template>
  <v-card class="mb-8" variant="flat">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="searchQuery"
            label="Search by title"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-magnify"
            hide-details
            class="mb-4"
            @update:model-value="handleSearch"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-combobox
            v-model="selectedGenres"
            :items="availableGenres"
            label="Filter by genres"
            variant="outlined"
            density="comfortable"
            multiple
            chips
            closable-chips
            hide-details
            class="mb-4"
            @update:model-value="handleSearch"
          ></v-combobox>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
export default {
  name: 'MediaSearchFilter',

  props: {
    availableGenres: {
      type: Array as () => string[],
      required: true,
    },
  },

  data() {
    return {
      searchQuery: '',
      selectedGenres: [] as string[],
      debounceTimeout: null as NodeJS.Timeout | null,
    }
  },

  methods: {
    handleSearch(): void {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout)
      }

      this.debounceTimeout = setTimeout(() => {
        this.$emit('search', {
          query: this.searchQuery,
          genres: this.selectedGenres,
        })
      }, 300)
    },
  },

  beforeUnmount() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }
  },
}
</script>
