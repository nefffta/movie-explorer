<template>
  <router-link :to="`/movie/${movie.id}`" class="movie-card">
    <img
      :src="getImageUrl(movie.poster_path)"
      :alt="movie.title"
      class="poster"
    />
    <div class="info">
      <h3>{{ movie.title }}</h3>
      <p class="release-date">🎬 {{ movie.release_date }}</p>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useMovieStore } from '@/store/movies'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const store = useMovieStore()

const isFav = computed(() =>
  store.favorites.some(f => f.id === props.movie.id)
)

function toggleFav() {
  store.toggleFavorite(props.movie)
}

function getImageUrl(path) {
  return path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : '/placeholder.png'
}
</script>

<style scoped lang="scss">
.movie-card {
  width: 200px;
  border-radius: 1rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-4px);
  }

  .poster {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .info {
    padding: 1rem;
    text-align: center;

    h3 {
      font-size: 1.1rem;
      margin: 0.5rem 0;
    }

    .release-date {
      color: #777;
      font-size: 0.9rem;
    }

    .fav-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: gold;
      margin-top: 0.5rem;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
