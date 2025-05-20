<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();


const books = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  const response = await fetch( "http://localhost:3000/books");
  const data = await response.json();
  books.value = data;
  console.log(data)

  isLoading.value = false;
});
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">👽👽 Ma librairie 👽👽 </h1>

    <div v-if="isLoading" class="alert alert-info">Chargement en cours...</div>

    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="book in books" :key="book._id">
        <div class="card h-100">
          <img
            :src="book.coverUri"
            :alt="book.title"
            class="card-img-top"
            style="object-fit: cover; height: 300px;"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ book.title }}</h5>
            <h6 class="card-subtitle text-muted fst-italic">
              {{ book.originalTitle }}
            </h6>
            <p class="card-text mt-2">
              <strong>Auteur :</strong>
              {{ book.author.firstName }} {{ book.author.lastName }}<br />
              <strong>Genre :</strong> {{ book.genre }}<br />
              <strong>Année :</strong> {{ book.publicationYear }}
            </p>
            <router-link
              :to="`/books/${book._id}`"
              class="mt-auto btn btn-outline-primary btn-sm"
            >
              Voir les détails
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  min-height: 100%;
}
</style>