<template>
  <nav class="nav-bar">
    <router-link to="/" class="nav-link">🏠 Home</router-link>
    <router-link to="/favorites" class="nav-link">⭐ Favoritos</router-link>
  </nav>
</template>

<script setup>
</script>

<style scoped lang="scss">
.nav-bar {
  background-color: #222;
  padding: 1rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;

  &:hover {
    text-decoration: underline;
  }

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
