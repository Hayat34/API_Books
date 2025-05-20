<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const bookId = route.params.id
const API_URL = `http://localhost:3000/books/${bookId}`

const book = ref({})
const isLoading = ref(true)

// Récupération du livre depuis l’API
onMounted(async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    book.value = data
  } catch (error) {
    console.error('Erreur lors du chargement du livre:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container mt-5">
    <div v-if="isLoading" class="alert alert-info">Chargement du livre...</div>

    <div v-else-if="book" class="row">
      <div class="col-md-4">
        <img
          :src="book.coverUri"
          :alt="book.title"
          class="img-fluid rounded shadow"
        />
      </div>
      <div class="col-md-8">
        <h2>{{ book.title }}</h2>
        <h4 class="text-muted fst-italic">{{ book.originalTitle }}</h4>
        <p><strong>Auteur :</strong> {{ book.author.firstName }} {{ book.author.lastName }}</p>
        <p><strong>Année :</strong> {{ book.publicationYear }}</p>
        <p><strong>Genre :</strong> {{ book.genre }}</p>
        <p v-if="book.recap"><strong>Résumé :</strong> {{ book.recap }}</p>

        <router-link to="/" class="btn btn-outline-primary mt-3">← Retour à la liste</router-link>
      </div>
    </div>
<!-- 
    <div v-else class="alert alert-danger">Livre introuvable.</div> -->
  </div>
</template>
