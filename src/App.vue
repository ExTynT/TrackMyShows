<script lang="ts">
import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    RouterView,
  },
}
</script>

<template>
  <div class="app">
    <header class="main-header">
      <div class="header-content">
        <h1 class="site-title">TrackMyShows</h1>
        <nav class="main-nav">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/anime" class="nav-link">Anime</RouterLink>
          <RouterLink to="/manga" class="nav-link">Manga</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="main-footer">
      <p>&copy; 2024 TrackMyShows</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #2e51a2;
  --secondary-color: #1a1f2c;
  --text-color: #e4e6eb;
  --text-color-secondary: #b0b3b8;
  --background-color: #0d1117;
  --card-background: #1a1f2c;
  --link-hover-color: #3b6ac9;
  --border-color: #30363d;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

#app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
}

.app {
  width: 100%;
  max-width: 1920px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.main-header {
  background-color: var(--secondary-color);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: var(--link-hover-color);
}

.nav-link.router-link-active {
  background-color: var(--link-hover-color);
}

.main-content {
  flex: 1;
  width: 100%;
  padding: 0;
}

.main-footer {
  background-color: var(--secondary-color);
  color: var(--text-color);
  text-align: center;
  padding: 1rem;
  margin-top: auto;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .main-nav {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
