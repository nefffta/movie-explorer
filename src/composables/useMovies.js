import { ref, watch, onMounted } from 'vue'
import api from '@/services/api'

export function useMovies() {
  const movies = ref([])
  const loading = ref(true)
  const error = ref(null)
  const page = ref(1)

  const fetchMovies = async () => {
    loading.value = true
    try {
      const response = await api.get('/movie/popular', {
        params: { page: page.value }
      })
      movies.value = response.data.results
    } catch (err) {
      error.value = 'Error cargando películas.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Refrescar cada vez que cambie la página
  watch(page, fetchMovies)

  onMounted(fetchMovies)

  return {
    movies,
    loading,
    error,
    page,
    fetchMovies
  }
}
