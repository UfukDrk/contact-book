<script>
const icons = {
  plus: ['M12 5v14M5 12h14'],
  search: ['M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM16 16l4.5 4.5'],
  close: ['m6 6 12 12M6 18 18 6'],
  arrowLeft: ['M19 12H5m6-6-6 6 6 6'],
  arrowRight: ['M5 12h14m-6-6 6 6-6 6'],
  chevronRight: ['m9 5 7 7-7 7'],
  sort: ['M8 4v16m-4-4 4 4 4-4M15 5h5M15 10h4M15 15h3'],
  contacts: ['M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2'],
  lock: ['M7 10V7a5 5 0 0 1 10 0v3M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2ZM12 14v3'],
  edit: ['m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15l-1 6ZM12 20h9'],
  trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
}

export default {
  props: {
    name: { type: String, required: true, validator: (name) => name in icons },
  },
  computed: {
    paths() {
      return icons[this.name]
    },
  },
}
</script>

<template>
  <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path v-for="(path, index) in paths" :key="index" :d="path" />
  </svg>
</template>
