<template>
  <div class="movie-detail" v-if="movie">
    <h1>{{ movie.title }}</h1>
    <button @click="toggleFav" class="fav-button">
        <span v-if="isFav">★ En favoritos</span>
        <span v-else>☆ Agregar a favoritos</span>
    </button>
    <img
      :src="getImageUrl(movie.poster_path)"
      :alt="movie.title"
      class="poster"
    />

    <p class="description">{{ movie.overview }}</p>
    <p><strong>🎯 Puntuación:</strong> {{ movie.vote_average }}/10</p>
    <p>
      <strong>🎬 Géneros:</strong>
      <span v-for="genre in movie.genres" :key="genre.id">
        {{ genre.name }}<span v-if="!isLastGenre(genre)">, </span>
      </span>
    </p>
  </div>

  <div v-else-if="loading">Cargando detalles...</div>
  <div v-else-if="error">{{ error }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
import { useMovieStore } from '@/store/movies'
import { computed } from 'vue'

const store = useMovieStore()

const isFav = computed(() =>
  store.favorites.some(f => f.id === movie.value?.id)
)

function toggleFav() {
  store.toggleFavorite(movie.value)
}

const route = useRoute()
const movie = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchMovieDetail = async () => {
  try {
    const { data } = await api.get(`/movie/${route.params.id}`)
    movie.value = data
  } catch (err) {
    error.value = 'No se pudo cargar la información de la película.'
  } finally {
    loading.value = false
  }
}

const getImageUrl = (path) => {
  return path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : '/placeholder.png'
}

const isLastGenre = (genre) => {
  return movie.value.genres[movie.value.genres.length - 1].id === genre.id
}

onMounted(fetchMovieDetail)
</script>

<style scoped lang="scss">
.movie-detail {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  h1 {
    margin-bottom: 1rem;
  }

  .poster {
    width: 100%;
    max-width: 400px;
    display: block;
    margin: 1rem auto;
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 1rem 0;
  }
}
</style>
