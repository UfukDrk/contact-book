<img src="assets/icon.svg" width="64" height="64" alt="">

# Contact Book

A personal address book for **MTM6407 — Web Development IV** at Algonquin College.
Built with Vue 3, Vue Router 4, Vite, JavaScript, and plain CSS.

## Features

- Contacts sorted alphabetically by last name, then first name.
- Search by first name, last name, or full name, ignoring case.
- A detail page showing every saved contact field.
- Add and edit forms with required first name, last name, and email.
- Optional phone, company, address, and notes.
- Confirmation before deleting a contact.
- Browser storage that preserves additions, edits, and deletions after refresh.
- Responsive layouts, labelled inputs, keyboard navigation, and empty states.

The app starts with an empty contact book. Contacts are saved only in the current
browser on the current device; they are not uploaded to GitHub or a server.

## Development

Tested with Node.js **24.20.0** and npm **11.19.0** on Windows.
Use Node.js 20.19+ or 22.12+ as required by Vite.

Run these commands from the folder containing `package.json`:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To install the exact locked package versions
after cloning this repository, use `npm ci` instead of `npm install`.

## Production build

```sh
npm run build
```

The generated files go into `dist/`. To check that build locally:

```sh
npm run preview
```

Live deployment is not required for this assignment. If deployed later,
`createWebHistory()` needs the host to serve `index.html` for application routes.

## How the code is organized

| File | Responsibility |
| --- | --- |
| `src/main.js` | Create the Vue app, register Router, and mount the app. |
| `src/router/index.js` | Define the list, detail, add, edit, and missing-page routes. |
| `src/App.vue` | Own the contacts array, handle CRUD events, and read/write browser storage. |
| `src/views/ContactsView.vue` | Filter and sort contacts with a computed property. |
| `src/views/ContactDetailView.vue` | Display all contact fields and confirm deletion. |
| `src/views/ContactFormView.vue` | Choose add/edit mode and pass form events to the app. |
| `src/components/ContactForm.vue` | Share the form fields and validation between add and edit. |
| `src/views/NotFoundView.vue` | Show a helpful message for an unknown URL. |
| `src/style.css` | Style the application and adapt it to smaller screens. |

Components use the **Options API**: `data`, `computed`, `methods`, `watch`, and
`mounted`. Props pass contacts down; component events pass changes back up.
The form uses `v-model.trim` and `@submit.prevent`. Editing uses a separate copy
of the field values so cancelling does not change the saved contact.

`App.vue` reads JSON from `localStorage` in `mounted`. A `deep: true` watcher
saves changes under the key `contact-book-contacts`. Unreadable saved data is
left intact and a warning is shown. A failed save also displays a warning.

## Routes and assignment requirements

| Route | View |
| --- | --- |
| `/` | Sorted, searchable contact list |
| `/contacts/new` | New contact form |
| `/contacts/:id` | Details for one contact |
| `/contacts/:id/edit` | Edit that same contact |

The `:id` route parameter identifies the person required by the detail/edit
requirements. Each new contact receives a unique ID using `crypto.randomUUID()`.
`this.$router.push()` opens the saved person's detail page after adding or
editing, and the list after deleting. These techniques support the assignment's
required navigation; their inclusion does not assume they appeared in the
instructor's examples.

Router reference: [Vue Router guide](https://router.vuejs.org/guide/).

## Verification

Checked in the browser using temporary fictional contacts:

- Last-name ordering, including reordering after a surname is edited.
- First-name, last-name, full-name, case-insensitive, and no-result searches.
- Clicking a contact opens the correct person's details.
- All seven form fields appear on the detail page.
- Required-field and email validation prevent invalid submissions.
- Adding opens the new detail page and survives refresh.
- Editing preserves the person's ID and contact count, and survives refresh.
- Cancelling an add/edit form leaves saved contacts unchanged.
- Cancelling deletion keeps the person; confirming returns to the list.
- Deleted contacts do not return after refresh.
- Missing contacts and unknown pages show helpful navigation.
- Keyboard tab order, visible focus, and labelled inputs.
- Desktop layout at 1366px and mobile layouts at 390px and 320px.
- Unreadable saved JSON shows a warning without overwriting the saved value.
- `npm run build` succeeds; no application errors were observed in the browser console.

## Submission

Public repository: <https://github.com/UfukDrk/contact-book>

Submit the public repository URL to Brightspace. Brightspace submission is a
separate step and is not performed by running this project.
