<template>
  <div class="favorites">
    <h1>🎥 Películas Favoritas</h1>

    <div v-if="favorites.length === 0" class="empty">
      No hay películas favoritas aún.
    </div>

    <div class="movie-grid">
      <MovieCard
        v-for="movie in favorites"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from '@/store/movies'
import MovieCard from '@/components/MovieCard.vue'

const store = useMovieStore()
const favorites = store.favorites
</script>

<style scoped lang="scss">
.favorites {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    margin-bottom: 1.5rem;
  }

  .empty {
    text-align: center;
    color: #888;
    font-style: italic;
    margin-top: 2rem;
  }

  .movie-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>
