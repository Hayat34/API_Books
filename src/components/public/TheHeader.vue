<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">📚 Ma Librairie</router-link>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link"
              :class="{ active: route.path === '/' }"
            >
              Accueil
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/admin/books"
              class="nav-link"
              :class="{ active: route.path.startsWith('/admin') }"
            >
              Admin
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
