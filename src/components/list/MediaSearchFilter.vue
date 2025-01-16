<!-- Filter pre vyhľadávanie médií -->
<template>
  <v-card class="mb-8" variant="flat">
    <v-container>
      <v-row>
        <!-- Vyhľadávanie podľa názvu -->
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
        <!-- Filtrovanie podľa žánrov -->
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
// Definícia komponentu pre vyhľadávanie
export default {
  name: 'MediaSearchFilter',

  // Vlastnosti komponentu
  props: {
    // Dostupné žánre na filtrovanie
    availableGenres: {
      type: Array as () => string[],
      required: true,
    },
  },

  // Lokálny stav komponentu
  data() {
    return {
      // Vyhľadávací dotaz
      searchQuery: '',
      // Vybrané žánre
      selectedGenres: [] as string[],
      // Časovač pre oneskorenie vyhľadávania
      debounceTimeout: null as NodeJS.Timeout | null,
    }
  },

  // Metódy komponentu
  methods: {
    // Spracovanie vyhľadávania s oneskorením
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

  // Čistenie časovača pri odstránení komponentu
  beforeUnmount() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }
  },
}
</script>
