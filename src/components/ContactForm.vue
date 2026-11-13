<script>
export default {
  props: {
    contact: { type: Object, default: null },
    cancelTo: { type: String, default: '/' },
  },
  emits: ['save-contact'],
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        notes: '',
      },
      formError: '',
    }
  },
  mounted() {
    // Copy the values so Cancel never changes the saved contact.
    if (this.contact) {
      this.form = {
        firstName: this.contact.firstName,
        lastName: this.contact.lastName,
        email: this.contact.email,
        phone: this.contact.phone || '',
        company: this.contact.company || '',
        address: this.contact.address || '',
        notes: this.contact.notes || '',
      }
    }
  },
  methods: {
    submitForm() {
      if (!this.form.firstName || !this.form.lastName || !this.form.email) {
        this.formError = 'Please enter a first name, last name, and email.'
        return
      }

      this.formError = ''
      this.$emit('save-contact', { ...this.form })
    },
  },
}
</script>

<template>
  <form class="panel contact-form" @submit.prevent="submitForm">
    <div class="form-section">
      <div class="section-heading">
        <h2>The essentials</h2>
        <p>Fields marked <span aria-hidden="true">*</span> are required.</p>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label for="first-name">First name <span aria-hidden="true">*</span></label>
          <input id="first-name" v-model.trim="form.firstName" name="firstName" autocomplete="given-name" maxlength="100" required />
        </div>
        <div class="form-field">
          <label for="last-name">Last name <span aria-hidden="true">*</span></label>
          <input id="last-name" v-model.trim="form.lastName" name="lastName" autocomplete="family-name" maxlength="100" required />
        </div>
        <div class="form-field full-width">
          <label for="email">Email <span aria-hidden="true">*</span></label>
          <input id="email" v-model.trim="form.email" type="email" name="email" autocomplete="email" maxlength="254" required />
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="section-heading">
        <h2>A few more details</h2>
        <p>Optional, but handy when you need them.</p>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label for="phone">Phone</label>
          <input id="phone" v-model.trim="form.phone" type="tel" name="phone" autocomplete="tel" maxlength="40" />
        </div>
        <div class="form-field">
          <label for="company">Company</label>
          <input id="company" v-model.trim="form.company" name="company" autocomplete="organization" maxlength="120" />
        </div>
        <div class="form-field full-width">
          <label for="address">Address</label>
          <textarea id="address" v-model.trim="form.address" name="address" autocomplete="street-address" rows="2" maxlength="300"></textarea>
        </div>
        <div class="form-field full-width">
          <label for="notes">Notes</label>
          <textarea id="notes" v-model.trim="form.notes" name="notes" rows="3" maxlength="1000" placeholder="A birthday, a shared interest, a reason to catch up…"></textarea>
        </div>
      </div>
    </div>

    <p v-if="formError" class="notice notice-warning form-error" role="alert">{{ formError }}</p>
    <div class="form-actions">
      <RouterLink class="button button-secondary" :to="cancelTo">Cancel</RouterLink>
      <button class="button button-primary" type="submit">{{ contact ? 'Save changes' : 'Save contact' }}</button>
    </div>
  </form>
</template>
