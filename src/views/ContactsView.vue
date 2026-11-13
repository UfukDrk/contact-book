<script>
import AppIcon from '../components/AppIcon.vue'

export default {
  components: { AppIcon },
  props: {
    contacts: { type: Array, required: true },
  },
  data() {
    return { search: '' }
  },
  computed: {
    filteredContacts() {
      const query = this.search.toLocaleLowerCase()

      return this.contacts
        .filter((contact) => `${contact.firstName} ${contact.lastName}`.toLocaleLowerCase().includes(query))
        .sort((first, second) =>
          first.lastName.localeCompare(second.lastName, 'en', { sensitivity: 'base' }) ||
          first.firstName.localeCompare(second.firstName, 'en', { sensitivity: 'base' }),
        )
    },
  },
  methods: {
    initials(contact) {
      return `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase()
    },
    clearSearch() {
      this.search = ''
      this.$refs.searchInput.focus()
    },
  },
}
</script>

<template>
  <section aria-labelledby="contacts-heading">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Your workspace</p>
        <h1 id="contacts-heading">Contacts</h1>
        <p class="page-description">Everyone you need. All in one place.</p>
      </div>
      <RouterLink class="button button-primary" to="/contacts/new"><AppIcon name="plus" /> Add contact</RouterLink>
    </div>

    <div class="panel contacts-panel">
      <div class="list-toolbar">
        <div class="search-field">
          <label class="sr-only" for="contact-search">Search by first or last name</label>
          <AppIcon name="search" class="search-icon" />
          <input
            id="contact-search"
            ref="searchInput"
            v-model.trim="search"
            type="search"
            placeholder="Search contacts…"
            autocomplete="off"
            aria-controls="contact-results"
          />
          <button v-if="search" class="clear-search" type="button" aria-label="Clear search" @click="clearSearch"><AppIcon name="close" /></button>
        </div>
        <span class="sort-label"><AppIcon name="sort" /> Last name <span class="sort-order">A–Z</span></span>
      </div>

      <div class="list-labels" aria-hidden="true">
        <span>Name</span><span>Email address</span><span>Company</span><span></span>
      </div>

      <div id="contact-results">
        <ul v-if="filteredContacts.length" class="contact-list">
          <li v-for="contact in filteredContacts" :key="contact.id">
            <RouterLink class="contact-row" :to="`/contacts/${contact.id}`">
              <span class="contact-person">
                <span class="avatar" aria-hidden="true">{{ initials(contact) }}</span>
                <span class="contact-name">{{ contact.firstName }} {{ contact.lastName }}</span>
              </span>
              <span class="contact-email">{{ contact.email }}</span>
              <span class="contact-company">{{ contact.company || '—' }}</span>
              <AppIcon name="chevronRight" class="row-arrow" />
            </RouterLink>
          </li>
        </ul>

        <div v-else-if="search" class="empty-state">
          <span class="empty-symbol" aria-hidden="true"><AppIcon name="search" /></span>
          <h2>No contacts found</h2>
          <p>Try a different first or last name, or clear your search to see everyone.</p>
          <button class="button button-secondary" type="button" @click="clearSearch">Clear search</button>
        </div>

        <div v-else class="empty-state empty-state-welcome">
          <div class="empty-illustration" aria-hidden="true">
            <div class="illustration-card illustration-card-back"></div>
            <div class="illustration-card illustration-card-front">
              <span class="illustration-avatar"><AppIcon name="contacts" /></span>
              <span class="illustration-lines"><span></span><span></span></span>
              <span class="illustration-plus"><AppIcon name="plus" /></span>
            </div>
          </div>
          <h2>Your network starts here.</h2>
          <p>A simple home for the people in your life.<br />Add a contact to get started.</p>
          <RouterLink class="button button-primary" to="/contacts/new"><AppIcon name="plus" /> Add your first contact</RouterLink>
        </div>
      </div>

      <div class="list-footer" role="status">
        <span><span class="numeric">{{ filteredContacts.length }}</span> {{ filteredContacts.length === 1 ? 'contact' : 'contacts' }}{{ search ? ` of ${contacts.length}` : ' in your workspace' }}</span>
        <span>Sorted alphabetically</span>
      </div>
    </div>
  </section>
</template>
