<!-- Záložky pre filtrovanie podľa stavu média -->
<template>
  <!-- Panel záložiek -->
  <v-tabs
    v-model="selectedTab"
    color="primary"
    align-tabs="center"
    class="media-status-tabs"
    show-arrows
  >
    <!-- Jednotlivé záložky -->
    <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
      <v-icon start>{{ tab.icon }}</v-icon>
      {{ tab.label }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
// Importy potrebných závislostí
import { defineComponent } from 'vue'

// Rozhranie pre záložku
export interface StatusTab {
  label: string
  value: string
  icon: string
}

export default defineComponent({
  name: 'MediaStatusTabs',

  // Vlastnosti komponentu
  props: {
    // Aktuálne vybraná hodnota
    modelValue: {
      type: String,
      required: true,
    },
    // Zoznam záložiek
    tabs: {
      type: Array as () => StatusTab[],
      required: true,
    },
  },

  // Definícia emitovaných udalostí
  emits: ['update:modelValue'],

  // Vypočítané vlastnosti
  computed: {
    // Správa vybranej záložky
    selectedTab: {
      get() {
        return this.modelValue
      },
      set(value: string) {
        this.$emit('update:modelValue', value)
      },
    },
  },

  // Sledovanie zmien
  watch: {
    // Kontrola platnosti vybranej hodnoty
    modelValue: {
      immediate: true,
      handler(newValue: string) {
        if (newValue && !this.tabs.some((tab) => tab.value === newValue)) {
          this.selectedTab = this.tabs[0].value
        }
      },
    },
  },
})
</script>

<style scoped>
.media-status-tabs {
  margin-bottom: 1rem;
}
</style>
