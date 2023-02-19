<template>
  <router-link v-if="target" :to="target">{{ name }}</router-link>
  <span v-else>{{ name }}</span>
</template>

<script>
export default {
  props: {
    item: Object
  },
  computed: {
    name() {
      if(this.item === null) {
        return 'None';
      }
      else if(this.item) {
        return this.item.name;
      }
      return 'Unknown';
    },
    target() {
      if(this.item && this.item.slug) {
        return { name: this.item.category, params: { id: this.item.slug } };
      }
      return null
    }
  }
}
</script>
