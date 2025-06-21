import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2I1NWVjYzRiZjc1M2VmZjdjYjhhNWY2ZDhkMzk2MyIsIm5iZiI6MTc1MDM4NjM5NC4xODEsInN1YiI6IjY4NTRjNmRhNDg0ZjFjN2U2Zjg0ZTMwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QzyJWm4bzMaEb5sVv3P7h0ZyDffsPdqZOi9Jtl_oLN0`
  }
})

export default api