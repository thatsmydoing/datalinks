<template>
  <a v-link="target">{{ name }}</a>
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
      if(this.item) {
        return { name: this.item.category, params: { id: this.item.slug } };
      }
      return null
    }
  }
}
</script>
