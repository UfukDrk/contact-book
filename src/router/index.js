import { createRouter, createWebHistory } from 'vue-router'
import ContactsView from '../views/ContactsView.vue'
import ContactDetailView from '../views/ContactDetailView.vue'
import ContactFormView from '../views/ContactFormView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'contacts', component: ContactsView },
    { path: '/contacts/new', name: 'new-contact', component: ContactFormView },
    { path: '/contacts/:id', name: 'contact-details', component: ContactDetailView },
    { path: '/contacts/:id/edit', name: 'edit-contact', component: ContactFormView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

export default router
