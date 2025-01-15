<template>
  <nav class="nav-bar">
    <div class="nav-content">
      <div class="d-flex align-center">
        <router-link to="/" class="text-decoration-none">
          <div class="site-title-wrapper">
            <h1 class="site-title">TrackMyShows</h1>
          </div>
        </router-link>

        <div class="nav-links">
          <v-btn variant="text" to="/anime">Anime</v-btn>
          <v-btn variant="text" to="/manga">Manga</v-btn>
        </div>
      </div>

      <div class="d-flex align-center">
        <template v-if="authStore.isAuthenticated">
          <v-btn variant="text" to="/my-list">My List</v-btn>
          <v-btn variant="text" @click="handleSignOut">Sign Out</v-btn>
        </template>
        <template v-else>
          <v-btn variant="text" to="/signin">Sign In</v-btn>
        </template>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NavigationBar',

  data() {
    return {
      router: useRouter(),
      authStore: useAuthStore(),
    }
  },

  methods: {
    async handleSignOut() {
      await this.authStore.signOut()
      this.router.push('/signin')
    },
  },
})
</script>

<style scoped>
.nav-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--background-color);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.nav-content {
  width: 1200px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-title-wrapper {
  position: relative;
  padding: 4px 0;
}

.site-title {
  font-size: 24px;
  font-weight: 800;
  margin: 0;
  padding: 0;
  line-height: 1;
  letter-spacing: -0.5px;
  color: white;
  transition: color 0.2s ease;
}

.site-title:hover {
  color: var(--v-primary-base);
}

.nav-links {
  margin-left: 48px;
  display: flex;
  gap: 32px;
}
</style>
