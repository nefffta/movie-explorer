<template>
  <div>
    <h1>Películas Populares</h1>

    <!-- BARRA DE BÚSQUEDA -->
    <form @submit.prevent="buscarPeliculas" class="search-bar">
      <input
        type="text"
        v-model="busqueda"
        placeholder="Buscar películas..."
      />
      <button type="submit">Buscar</button>
      <button type="button" @click="limpiarBusqueda" v-if="busqueda">×</button>
    </form>

    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>

    <div class="movie-grid">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">← Anterior</button>
      <span>Página {{ page }}</span>
      <button @click="nextPage">Siguiente →</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import api from '@/services/api'
import MovieCard from '@/components/MovieCard.vue'

const movies = ref([])
const loading = ref(true)
const error = ref(null)
const page = ref(1)
const busqueda = ref('')
const modoBusqueda = ref(false)

const fetchPopulares = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await api.get('/movie/popular', { params: { page: page.value } })
    movies.value = res.data.results
    modoBusqueda.value = false
  } catch (err) {
    error.value = 'Error al cargar películas populares.'
  } finally {
    loading.value = false
  }
}

const buscarPeliculas = async () => {
  if (!busqueda.value.trim()) return
  loading.value = true
  error.value = null
  try {
    const res = await api.get('/search/movie', {
      params: { query: busqueda.value, page: page.value }
    })
    movies.value = res.data.results
    modoBusqueda.value = true
  } catch (err) {
    error.value = 'Error al buscar películas.'
  } finally {
    loading.value = false
  }
}

const limpiarBusqueda = () => {
  busqueda.value = ''
  page.value = 1
  fetchPopulares()
}

const nextPage = () => {
  page.value++
}

const prevPage = () => {
  if (page.value > 1) page.value--
}

watch(page, () => {
  if (modoBusqueda.value && busqueda.value.trim()) {
    buscarPeliculas()
  } else {
    fetchPopulares()
  }
})


// Carga inicial
fetchPopulares()
</script>

<style scoped lang="scss">
.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #42b983;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #369f72;
    }
  }
}
</style>
