<script>
import AppIcon from './AppIcon.vue'

export default {
  components: { AppIcon },
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
        <h2>Basic information</h2>
        <p>Fields marked <span aria-hidden="true">*</span> are required.</p>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label for="first-name">First name <span aria-hidden="true">*</span></label>
          <input id="first-name" v-model.trim="form.firstName" name="firstName" autocomplete="given-name" placeholder="First name" maxlength="100" required />
        </div>
        <div class="form-field">
          <label for="last-name">Last name <span aria-hidden="true">*</span></label>
          <input id="last-name" v-model.trim="form.lastName" name="lastName" autocomplete="family-name" placeholder="Last name" maxlength="100" required />
        </div>
        <div class="form-field full-width">
          <label for="email">Email <span aria-hidden="true">*</span></label>
          <input id="email" v-model.trim="form.email" type="email" name="email" autocomplete="email" placeholder="name@example.com" maxlength="254" required />
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="section-heading">
        <h2>Additional details</h2>
        <p>A little more context. All fields in this section are optional.</p>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label for="phone">Phone</label>
          <input id="phone" v-model.trim="form.phone" type="tel" name="phone" autocomplete="tel" placeholder="Phone number" maxlength="40" />
        </div>
        <div class="form-field">
          <label for="company">Company</label>
          <input id="company" v-model.trim="form.company" name="company" autocomplete="organization" placeholder="Company name" maxlength="120" />
        </div>
        <div class="form-field full-width">
          <label for="address">Address</label>
          <textarea id="address" v-model.trim="form.address" name="address" autocomplete="street-address" rows="2" maxlength="300" placeholder="Street address, city, postal code"></textarea>
        </div>
        <div class="form-field full-width">
          <label for="notes">Notes</label>
          <textarea id="notes" v-model.trim="form.notes" name="notes" rows="3" maxlength="1000" placeholder="Anything you would like to remember…"></textarea>
        </div>
      </div>
    </div>

    <p v-if="formError" class="notice notice-warning form-error" role="alert">{{ formError }}</p>
    <div class="form-actions">
      <p class="form-hint"><AppIcon name="lock" /> Only stored in this browser</p>
      <div class="button-group">
        <RouterLink class="button button-secondary" :to="cancelTo">Cancel</RouterLink>
        <button class="button button-primary" type="submit">{{ contact ? 'Save changes' : 'Save contact' }} <AppIcon name="arrowRight" /></button>
      </div>
    </div>
  </form>
</template>
