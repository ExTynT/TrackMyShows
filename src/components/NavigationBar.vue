<template>
  <div class="nav-bar">
    <div class="nav-content">
      <div class="d-flex align-center">
        <router-link to="/" class="text-decoration-none site-title-wrapper">
          <h1 class="site-title">Track My Shows</h1>
        </router-link>

        <div class="nav-links">
          <router-link to="/anime" class="nav-link">
            <div class="nav-link-content">
              <v-icon size="20" class="nav-icon">mdi-play-circle</v-icon>
              <span class="nav-link-text">Anime</span>
            </div>
            <div class="nav-link-indicator"></div>
          </router-link>
        </div>
      </div>

      <div class="nav-actions">
        <v-btn variant="text" class="action-btn" prepend-icon="mdi-magnify"> Search </v-btn>
        <v-btn color="primary" class="action-btn" prepend-icon="mdi-account"> Sign In </v-btn>
      </div>
    </div>
  </div>
</template>

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

.nav-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  position: relative;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.nav-link-content {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-icon {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.nav-link:hover {
  color: white;
}

.nav-link:hover .nav-icon {
  opacity: 1;
}

.nav-link-indicator {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--v-primary-base);
  transform: scaleX(0);
  transition: transform 0.2s ease;
  transform-origin: center;
}

.nav-link:hover .nav-link-indicator,
.router-link-active .nav-link-indicator {
  transform: scaleX(1);
}

.router-link-active {
  color: white;
}

.router-link-active .nav-icon {
  opacity: 1;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  text-transform: none;
  font-weight: 500;
  letter-spacing: normal;
}

@media (max-width: 768px) {
  .nav-bar {
    height: 56px;
  }

  .site-title {
    font-size: 20px;
  }

  .nav-links {
    margin-left: 24px;
  }

  .nav-link {
    font-size: 14px;
  }

  .nav-icon {
    font-size: 18px;
  }

  .action-btn {
    font-size: 14px;
  }
}
</style>
