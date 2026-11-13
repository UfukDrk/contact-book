<script>
export default {
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
  <section>
    <div class="page-heading">
      <div>
        <p class="eyebrow">A little more connected</p>
        <h1>My contacts<span class="count-badge">{{ contacts.length }}</span></h1>
        <p class="page-description">Good connections start with keeping in touch.</p>
      </div>
      <span class="heading-note">Your people. One place.</span>
    </div>

    <div class="panel">
      <div class="list-toolbar">
        <div class="search-field">
          <label class="sr-only" for="contact-search">Search by first or last name</label>
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            id="contact-search"
            ref="searchInput"
            v-model.trim="search"
            type="search"
            placeholder="Search by first or last name…"
            autocomplete="off"
          />
          <button v-if="search" class="clear-search" type="button" aria-label="Clear search" @click="clearSearch">×</button>
        </div>
        <span class="sort-label">Sorted by last name <span aria-hidden="true">↓</span></span>
      </div>

      <template v-if="filteredContacts.length">
        <div class="list-labels" aria-hidden="true">
          <span>Name</span><span>Email</span><span>Company</span><span></span>
        </div>
        <ul class="contact-list">
          <li v-for="contact in filteredContacts" :key="contact.id">
            <RouterLink class="contact-row" :to="`/contacts/${contact.id}`">
              <span class="contact-person">
                <span class="avatar" aria-hidden="true">{{ initials(contact) }}</span>
                <span class="contact-name">{{ contact.firstName }} {{ contact.lastName }}</span>
              </span>
              <span class="contact-email">{{ contact.email }}</span>
              <span class="contact-company">{{ contact.company || '—' }}</span>
              <span class="row-arrow" aria-hidden="true">↗</span>
            </RouterLink>
          </li>
        </ul>
      </template>

      <div v-else-if="search" class="empty-state">
        <span class="empty-symbol" aria-hidden="true">?</span>
        <h2>No matching contacts</h2>
        <p>Try another first or last name.</p>
        <button class="button button-secondary" type="button" @click="clearSearch">Clear search</button>
      </div>

      <div v-else class="empty-state">
        <span class="empty-symbol" aria-hidden="true">+</span>
        <h2>A place for your people.</h2>
        <p>Add your first contact and keep the details that matter close by.</p>
        <RouterLink class="button button-primary" to="/contacts/new">Add your first contact</RouterLink>
      </div>

      <div class="list-footer" role="status">
        <span>{{ filteredContacts.length }} {{ filteredContacts.length === 1 ? 'contact' : 'contacts' }}{{ search ? ` found out of ${contacts.length}` : ' in your book' }}</span>
        <span>Made for keeping in touch</span>
      </div>
    </div>
  </section>
</template>
