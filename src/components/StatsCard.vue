<script lang="ts">
export default {
  name: 'StatsCard',
  props: {
    count: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <div class="stats-card">
    <div class="progress-circle">
      <span class="progress-number">{{ count }}</span>
      <span class="progress-label">{{ label }}</span>
    </div>
    <div class="stats-actions">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.stats-card {
  background: var(--card-background);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.progress-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: var(--background-color);
  border: 4px solid var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
}

.progress-circle::after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  opacity: 0.2;
}

.progress-number {
  font-size: 2.2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.2rem;
}

.progress-label {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  max-width: 120px;
  line-height: 1.2;
}

.stats-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  width: 100%;
  margin-top: 1rem;
}
</style>
