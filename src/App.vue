<script>
import AppIcon from "./components/AppIcon.vue";

export default {
  components: { AppIcon },
  data() {
    return {
      contacts: [],
      storageError: "",
      canSave: true,
      storageKey: "contact-book-contacts",
    };
  },
  watch: {
    "$route.fullPath"() {
      this.$nextTick(() => {
        this.$refs.mainContent.focus();
        window.scrollTo(0, 0);
      });
    },
    contacts: {
      deep: true,
      handler(contacts) {
        if (!this.canSave) return;

        try {
          localStorage.setItem(this.storageKey, JSON.stringify(contacts));
          this.storageError = "";
        } catch {
          this.storageError =
            "Your browser could not save these changes. Keep this page open to avoid losing them.";
        }
      },
    },
  },
  mounted() {
    try {
      const savedContacts = localStorage.getItem(this.storageKey);
      if (savedContacts === null) return;

      const contacts = JSON.parse(savedContacts);
      const validContacts =
        Array.isArray(contacts) &&
        contacts.every(
          (contact) =>
            contact &&
            Number.isSafeInteger(contact.id) &&
            contact.id > 0 &&
            typeof contact.firstName === "string" &&
            typeof contact.lastName === "string" &&
            typeof contact.email === "string",
        );

      if (!validContacts) throw new Error("Invalid saved contacts");
      this.contacts = contacts;
    } catch {
      // Keep unreadable saved data intact instead of overwriting it.
      this.canSave = false;
      this.storageError =
        "Saved contacts could not be loaded. Changes in this session will not be saved.";
    }
  },
  methods: {
    addContact(form) {
      const id = Math.max(0, ...this.contacts.map((contact) => contact.id)) + 1;
      const contact = { ...form, id };
      this.contacts.push(contact);
      this.$router.push(`/contacts/${contact.id}`);
    },
    updateContact(updatedContact) {
      const index = this.contacts.findIndex(
        (contact) => contact.id === updatedContact.id,
      );
      if (index === -1) return;

      this.contacts[index] = updatedContact;
      this.$router.push(`/contacts/${updatedContact.id}`);
    },
    deleteContact(id) {
      this.contacts = this.contacts.filter((contact) => contact.id !== id);
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <div class="header-content">
      <div class="workspace-identity">
        <RouterLink class="brand" to="/" aria-label="Contact Book home">
          <img src="../assets/icon.svg" width="30" height="30" alt="" />
          <span>Contact Book</span>
        </RouterLink>
        <span class="workspace-divider" aria-hidden="true">/</span>
        <span class="workspace-name">Personal workspace</span>
        <span class="workspace-badge">Personal</span>
      </div>
      <span
        class="storage-status"
        :class="{ 'storage-status-warning': storageError }"
      >
        <span class="status-dot" aria-hidden="true"></span>
        {{ storageError ? "Storage unavailable" : "On this device" }}
      </span>
    </div>
    <div class="navigation-content">
      <nav class="main-nav" aria-label="Main navigation">
        <RouterLink
          class="nav-link"
          :class="{ 'is-active': $route.name !== 'not-found' }"
          to="/"
        >
          <AppIcon name="contacts" />
          Contacts
          <span class="nav-count">{{ contacts.length }}</span>
        </RouterLink>
      </nav>
      <span class="navigation-note">A little more connected.</span>
    </div>
  </header>

  <main
    id="main-content"
    ref="mainContent"
    class="page-container"
    tabindex="-1"
  >
    <p v-if="storageError" class="notice notice-warning" role="alert">
      {{ storageError }}
    </p>
    <RouterView
      :key="$route.fullPath"
      :contacts="contacts"
      @add-contact="addContact"
      @update-contact="updateContact"
      @delete-contact="deleteContact"
    />
  </main>

  <footer class="site-footer">
    <div class="footer-brand">
      <img src="../assets/icon.svg" width="20" height="20" alt="" />
      <span>Contact Book</span>
      <span class="footer-course">MTM6407 · Web Development IV</span>
    </div>
    <span class="footer-privacy"
      ><AppIcon name="lock" /> Stored in this browser. Just for you.</span
    >
  </footer>
</template>
