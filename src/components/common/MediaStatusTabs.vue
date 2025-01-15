<template>
  <v-tabs
    v-model="selectedTab"
    color="primary"
    align-tabs="center"
    class="media-status-tabs"
    show-arrows
  >
    <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
      <v-icon start>{{ tab.icon }}</v-icon>
      {{ tab.label }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export interface StatusTab {
  label: string
  value: string
  icon: string
}

export default defineComponent({
  name: 'MediaStatusTabs',

  props: {
    modelValue: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array as () => StatusTab[],
      required: true,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    selectedTab: {
      get() {
        return this.modelValue
      },
      set(value: string) {
        this.$emit('update:modelValue', value)
      },
    },
  },

  watch: {
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
