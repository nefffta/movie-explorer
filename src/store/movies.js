import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movies', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
  }),
  actions: {
    toggleFavorite(movie) {
      const exists = this.favorites.find(m => m.id === movie.id)
      if (exists) {
        this.favorites = this.favorites.filter(m => m.id !== movie.id)
      } else {
        this.favorites.push(movie)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    }
  }
})
