<script lang="ts">
export default {
  name: 'ReviewCard',
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <article class="review-item">
    <div class="review-header">
      <div class="user-info">
        <img :src="review.avatar" :alt="review.username" class="user-avatar" />
        <div class="user-details">
          <span class="username">{{ review.username }}</span>
          <span class="review-anime">{{ review.anime }}</span>
        </div>
      </div>
      <div class="review-rating">★ {{ review.rating.toFixed(1) }}</div>
    </div>
    <p class="review-content">{{ review.content }}</p>
    <div class="review-footer">
      <time class="review-date">{{ review.date }}</time>
      <button class="like-button">
        <i class="fas fa-heart"></i>
        {{ review.likes }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.review-item {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  transition: transform 0.2s ease;
}

.review-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.8rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  color: var(--text-color);
  font-weight: 600;
  font-size: 0.95rem;
}

.review-anime {
  color: var(--text-color-secondary);
  font-size: 0.85rem;
}

.review-rating {
  background: rgba(46, 81, 162, 0.1);
  color: #ffd700;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-weight: 600;
}

.review-content {
  color: var(--text-color);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-date {
  color: var(--text-color-secondary);
  font-size: 0.85rem;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.like-button:hover {
  color: #ff4757;
}

.like-button i {
  font-size: 0.9rem;
}
</style>
