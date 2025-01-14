<template>
  <div class="nav-bar">
    <div class="nav-content">
      <div class="d-flex align-center">
        <router-link to="/" class="text-decoration-none site-title-wrapper">
          <h1 class="site-title">
            <span class="title-track">Track My Shows</span>
          </h1>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  border-bottom: 2px solid var(--primary-color);
  background: var(--background-color);
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-content {
  width: 1200px;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

.site-title-wrapper {
  position: relative;
  padding: 4px 0;
}

.site-title {
  font-size: 20px;
  font-weight: 800;
  margin: 0;
  padding: 0;
  line-height: 1;
  letter-spacing: -0.5px;
  background: linear-gradient(45deg, var(--primary-color), #7e57c2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-track {
  color: var(--primary-color);
}
.title-my {
  opacity: 0.9;
}
.title-shows {
  opacity: 0.8;
}

.nav-links {
  margin-left: 32px;
  display: flex;
  gap: 24px;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  padding: 4px 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary-color);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-link-text {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.nav-link:hover .nav-link-text {
  opacity: 1;
}
</style>
