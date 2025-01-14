<script lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import FooterBar from './components/FooterBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar,
    FooterBar,
  },
}
</script>

<template>
  <v-app theme="dark">
    <NavigationBar />
    <v-main>
      <div class="app-container">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<style>
:root {
  --primary-color: #2e51a2;
  --secondary-color: #1f2937;
  --text-color: #e4e6eb;
  --text-color-secondary: #9ca3af;
  --background-color: #111827;
  --card-background: #1f2937;
  --link-hover-color: #3b82f6;
  --border-color: #374151;
}

.v-application {
  background-color: var(--background-color) !important;
  min-height: 100vh;
}

.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.main-content {
  width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}

.bg-secondary {
  background-color: var(--secondary-color) !important;
}

.primary-text {
  color: var(--primary-color) !important;
}

.v-btn {
  text-transform: none !important;
  letter-spacing: normal !important;
}

@media (max-width: 600px) {
  .main-content {
    padding: 16px 8px;
  }
}
</style>
