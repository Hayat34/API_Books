import { createRouter, createWebHistory } from 'vue-router'
import ClientBooksList from '@/components/public/ClientBooksList.vue'
import ClientBookDetail from '@/components/public/ClientBookDetail.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes:[
    {
		path: '/',
		name: 'home',
		component: ClientBooksList
	},
    {
        path: '/books/:id',
        name: 'bookDetails',
        component: ClientBookDetail,
      },
    {
        path: '/admin/books',
        name: 'adminBookList',
        component: () => import('@/components/admin/AdminBookList.vue'),
    },
    {
        path: '/admin/books/create',
        name: 'adminBooksAdd',
        component: () => import('@/components/admin/AdminBooksCreate.vue'),
    },
    {
        path: '/admin/books/:id/update',
        name: 'adminBooksUpdate',
        component: () => import('@/components/admin/AdminBooksUpdate.vue'),
    },
    

],
})


export default router

