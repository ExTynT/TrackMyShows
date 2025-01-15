<template>
  <v-card class="mb-6" elevation="2">
    <v-card-title class="text-h5 py-4 px-6 bg-primary text-white">
      <v-icon start class="me-2">mdi-account-multiple</v-icon>
      Characters
    </v-card-title>
    <v-card-text class="pa-6">
      <v-row>
        <v-col
          v-for="character in characters"
          :key="character.id"
          cols="12"
          sm="6"
          md="4"
          class="d-flex"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :elevation="isHovering ? 8 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              variant="outlined"
              class="character-card d-flex flex-column"
              width="100%"
            >
              <div class="character-icon-container pa-8 d-flex justify-center align-center">
                <v-avatar size="48">
                  <v-icon :icon="character.icon" color="primary"></v-icon>
                </v-avatar>
              </div>
              <v-card-text class="flex-grow-1 d-flex flex-column">
                <div>
                  <h3 class="text-h6 mb-2">{{ character.name }}</h3>
                  <p v-if="character.japanese_name" class="text-grey mb-2">
                    {{ character.japanese_name }}
                  </p>
                </div>
                <p class="text-body-2 mt-auto">{{ character.description }}</p>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Character {
  id: number
  name: string
  japanese_name?: string
  description?: string
  icon: string
}

export default defineComponent({
  name: 'MediaDetailCharacters',

  props: {
    characters: {
      type: Array as PropType<Character[]>,
      required: true,
    },
  },
})
</script>

<style scoped>
.character-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05) !important;
}

.character-icon-container {
  background: #2a2a2a;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.character-image {
  border-radius: 8px 8px 0 0;
  transition: opacity 0.2s ease;
}

.character-image:hover {
  opacity: 0.9;
}

.character-icon {
  opacity: 0.9;
  transition: all 0.3s ease;
}

.on-hover .character-icon {
  opacity: 1;
  transform: scale(1.1);
}

.v-card-text {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.text-grey) {
  color: rgba(255, 255, 255, 0.7) !important;
}

.on-hover {
  transition: all 0.3s ease;
}

.on-hover:hover {
  transform: translateY(-4px);
}
</style>
