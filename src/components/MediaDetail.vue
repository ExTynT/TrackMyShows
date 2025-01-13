<script setup lang="ts">
import type { AnimeDetails, MangaDetails } from '@/stores/mediaStore'

interface Props {
  media: AnimeDetails | MangaDetails
}

const props = defineProps<Props>()

const isAnime = (media: AnimeDetails | MangaDetails): media is AnimeDetails => {
  return 'episodes' in media
}

const getMediaSpecificInfo = () => {
  if (isAnime(props.media)) {
    return [
      { label: 'Episodes', value: props.media.episodes },
      { label: 'Duration', value: props.media.duration },
      { label: 'Studios', value: props.media.studios.join(', ') },
      { label: 'Rating', value: props.media.rating },
      { label: 'Aired', value: props.media.aired },
    ]
  }
  return [
    { label: 'Chapters', value: props.media.chapters },
    { label: 'Volumes', value: props.media.volumes },
    { label: 'Author', value: props.media.author },
    { label: 'Serialization', value: props.media.serialization },
    { label: 'Published', value: props.media.published },
  ]
}
</script>

<template>
  <div class="media-detail">
    <div class="header">
      <div class="cover">
        <img :src="media.image" :alt="media.title" />
      </div>
      <div class="info">
        <div class="info-top">
          <h1>{{ media.title }}</h1>
          <div class="meta">
            <span class="score">★ {{ media.score.toFixed(1) }}</span>
            <span class="type">{{ media.type }}</span>
            <span class="year">{{ media.year }}</span>
            <span class="status">{{ media.status }}</span>
          </div>
          <div class="genres">
            <span v-for="genre in media.genres" :key="genre" class="genre">{{ genre }}</span>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <span class="label">Weekly Views :</span>
            <span class="value">{{ media.weeklyViews.toLocaleString() }}</span>
          </div>
          <div class="stat">
            <span class="label">Monthly Views :</span>
            <span class="value">{{ media.monthlyViews.toLocaleString() }}</span>
          </div>
          <div class="stat">
            <span class="label">Weekly Rank :</span>
            <span class="value">#{{ media.weeklyRank }}</span>
          </div>
          <div class="stat">
            <span class="label">Monthly Rank :</span>
            <span class="value">#{{ media.monthlyRank }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <section class="synopsis">
        <h2>Synopsis</h2>
        <p>{{ media.synopsis }}</p>
      </section>

      <section class="details">
        <h2>Information</h2>
        <div class="details-grid">
          <div v-for="info in getMediaSpecificInfo()" :key="info.label" class="detail-item">
            <span class="label">{{ info.label }}</span>
            <span class="value">{{ info.value }}</span>
          </div>
        </div>
      </section>

      <section class="characters">
        <h2>Characters</h2>
        <div class="characters-grid">
          <div v-for="char in media.mainCharacters" :key="char.name" class="character">
            <img
              :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${char.name}`"
              :alt="char.name"
            />
            <div class="character-info">
              <span class="name">{{ char.name }}</span>
              <span class="role">{{ char.role }} - {{ char.description }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="staff">
        <h2>Staff</h2>
        <div class="staff-grid">
          <div v-for="member in media.staff" :key="member.name" class="staff-member">
            <img
              :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`"
              :alt="member.name"
            />
            <div class="staff-info">
              <span class="name">{{ member.name }}</span>
              <span class="role">{{ member.role }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.media-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2.5rem;
  margin-bottom: 3rem;
  background: var(--card-background);
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.cover {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cover img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.info {
  display: flex;
  flex-direction: column;
  height: 420px;
  justify-content: space-between;
}

.info-top {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.meta {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;
}

.meta > span {
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  background: var(--background-color);
  border: 1px solid var(--border-color);
}

.score {
  color: #ffd700;
  font-weight: 700;
  font-size: 1rem;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.genre {
  background: var(--primary-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.genre:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat {
  background: var(--background-color);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.stat:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat .label {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  font-weight: 500;
}

.stat .value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-color);
}

.content {
  display: grid;
  gap: 2rem;
}

section {
  background: var(--card-background);
  padding: 2rem;
  border-radius: 24px;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease;
}

section:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-color);
  letter-spacing: -0.01em;
}

.synopsis {
  line-height: 1.7;
  color: var(--text-color);
  font-size: 1.05rem;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 12px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
}

.detail-item .label {
  font-weight: 500;
  color: var(--text-color-secondary);
}

.detail-item .value {
  font-weight: 600;
  color: var(--text-color);
}

.characters-grid,
.staff-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
}

.character,
.staff-member {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem;
  border-radius: 16px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.character:hover,
.staff-member:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.character img,
.staff-member img {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
}

.character-info,
.staff-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.name {
  font-weight: 600;
  color: var(--text-color);
  font-size: 1.05rem;
}

.role {
  font-size: 0.95rem;
  color: var(--text-color-secondary);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .header {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .cover {
    max-width: 280px;
    margin: 0 auto;
  }

  .cover img {
    height: auto;
    aspect-ratio: 2/3;
  }

  .info {
    height: auto;
    gap: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  .meta {
    gap: 0.8rem;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  section {
    padding: 1.5rem;
  }

  .characters-grid,
  .staff-grid {
    grid-template-columns: 1fr;
  }
}
</style>
