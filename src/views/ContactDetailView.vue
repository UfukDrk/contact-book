<script>
import AppIcon from '../components/AppIcon.vue'

export default {
  components: { AppIcon },
  props: {
    contacts: { type: Array, required: true },
  },
  emits: ['delete-contact'],
  data() {
    return { confirmingDelete: false }
  },
  computed: {
    contact() {
      return this.contacts.find((contact) => contact.id === this.$route.params.id)
    },
    initials() {
      if (!this.contact) return ''
      return `${this.contact.firstName.charAt(0)}${this.contact.lastName.charAt(0)}`.toUpperCase()
    },
  },
  methods: {
    showDeleteConfirmation() {
      this.confirmingDelete = true
      this.$nextTick(() => this.$refs.keepContact.focus())
    },
    cancelDelete() {
      this.confirmingDelete = false
      this.$nextTick(() => this.$refs.deleteButton.focus())
    },
  },
}
</script>

<template>
  <section class="narrow-page">
    <RouterLink class="back-link" to="/"><AppIcon name="arrowLeft" /> All contacts</RouterLink>

    <template v-if="contact">
      <div class="panel detail-card">
        <div class="profile-heading">
          <span class="avatar avatar-large" aria-hidden="true">{{ initials }}</span>
          <div class="profile-name">
            <p class="eyebrow">Contact details</p>
            <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>
            <p class="page-description">{{ contact.company || 'Personal contact' }}</p>
          </div>
          <RouterLink class="button button-secondary" :to="`/contacts/${contact.id}/edit`"><AppIcon name="edit" /> Edit contact</RouterLink>
        </div>

        <div class="details-content">
          <h2>Contact information</h2>
          <dl class="details-grid">
            <div><dt>First name</dt><dd>{{ contact.firstName }}</dd></div>
            <div><dt>Last name</dt><dd>{{ contact.lastName }}</dd></div>
            <div><dt>Email</dt><dd><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></dd></div>
            <div><dt>Phone</dt><dd><a v-if="contact.phone" :href="`tel:${contact.phone}`">{{ contact.phone }}</a><span v-else class="muted">Not provided</span></dd></div>
            <div><dt>Company</dt><dd :class="{ muted: !contact.company }">{{ contact.company || 'Not provided' }}</dd></div>
            <div><dt>Address</dt><dd class="multiline" :class="{ muted: !contact.address }">{{ contact.address || 'Not provided' }}</dd></div>
            <div class="full-width"><dt>Notes</dt><dd class="multiline" :class="{ muted: !contact.notes }">{{ contact.notes || 'No notes yet.' }}</dd></div>
          </dl>
        </div>

        <div class="delete-section">
          <template v-if="!confirmingDelete">
            <div>
              <h2>Delete contact</h2>
              <p>Permanently remove this person from your contacts.</p>
            </div>
            <button ref="deleteButton" class="button button-danger-outline" type="button" @click="showDeleteConfirmation"><AppIcon name="trash" /> Delete contact</button>
          </template>
          <div v-else class="delete-confirmation">
            <p role="alert">Delete <strong>{{ contact.firstName }} {{ contact.lastName }}</strong>? This cannot be undone.</p>
            <div class="button-group">
              <button ref="keepContact" class="button button-secondary" type="button" @click="cancelDelete">Keep contact</button>
              <button class="button button-danger" type="button" @click="$emit('delete-contact', contact.id)">Yes, delete contact</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="empty-state panel">
      <h1>Contact not found</h1>
      <p>This contact may have been deleted.</p>
      <RouterLink class="button button-primary" to="/">Back to contacts</RouterLink>
    </div>
  </section>
</template>
