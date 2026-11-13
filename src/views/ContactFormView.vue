<script>
import ContactForm from "../components/ContactForm.vue";
import AppIcon from "../components/AppIcon.vue";

export default {
  components: { ContactForm, AppIcon },
  props: {
    contacts: { type: Array, required: true },
  },
  emits: ["add-contact", "update-contact"],
  computed: {
    isEditing() {
      return this.$route.name === "edit-contact";
    },
    contact() {
      return this.contacts.find(
        (contact) => contact.id === Number(this.$route.params.id),
      );
    },
    cancelTo() {
      return this.isEditing && this.contact
        ? `/contacts/${this.contact.id}`
        : "/";
    },
  },
  methods: {
    saveContact(form) {
      if (this.isEditing) {
        this.$emit("update-contact", { ...form, id: this.contact.id });
      } else {
        this.$emit("add-contact", form);
      }
    },
  },
};
</script>

<template>
  <section class="narrow-page">
    <RouterLink class="back-link" :to="cancelTo"
      ><AppIcon name="arrowLeft" />
      {{
        isEditing && contact ? "Back to contact" : "All contacts"
      }}</RouterLink
    >

    <template v-if="!isEditing || contact">
      <div class="page-heading">
        <div>
          <p class="eyebrow">
            {{ isEditing ? "Contact settings" : "Grow your network" }}
          </p>
          <h1>{{ isEditing ? "Edit contact" : "New contact" }}</h1>
          <p class="page-description">
            {{
              isEditing
                ? "Keep their information up to date."
                : "Add someone new to your personal address book."
            }}
          </p>
        </div>
      </div>
      <ContactForm
        :contact="isEditing ? contact : null"
        :cancel-to="cancelTo"
        @save-contact="saveContact"
      />
    </template>

    <div v-else class="empty-state panel">
      <h1>Contact not found</h1>
      <p>This contact may have been deleted.</p>
      <RouterLink class="button button-primary" to="/"
        >Back to contacts</RouterLink
      >
    </div>
  </section>
</template>
