<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const books = ref([])
const isLoading = ref(true)
const router = useRouter()

// Charger les livres au démarrage
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/books')
    books.value = await response.json()
  } catch (error) {
    console.error('Erreur lors du chargement des livres :', error)
  } finally {
    isLoading.value = false
  }
})

// Fonction pour supprimer un livre
async function deleteBook(id) {
  if (!confirm('Voulez-vous vraiment supprimer ce livre ?')) return
  try {
    await fetch(`http://localhost:3000/books/${id}`, {
      method: 'DELETE'
    })
    // Retirer le livre supprimé de la liste affichée
    books.value = books.value.filter(book => book._id !== id)
  } catch (error) {
    console.error('Erreur lors de la suppression :', error)
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">📋 Gestion des Livres</h2>

    <div v-if="isLoading" class="alert alert-info">Chargement...</div>

    <table v-else class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Année</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book._id">
          <td>{{ book._id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author.firstName }} {{ book.author.lastName }}</td>
          <td>{{ book.publicationYear }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="router.push(`/admin/books/${book._id}/update`)"
            >
              ✏️ Modifier
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteBook(book._id)">
              🗑️ Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
