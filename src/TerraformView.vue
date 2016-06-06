<template>
  <div class="terraform-view info-panel">
    <span>Turns to Complete: {{ terraform.turns }}</span>
    <span class="prereq">Prerequisite: <item-link :item="terraform.prerequisite"></item-link></span>
    <markup-view :text="text"></markup-view>
  </div>
</template>

<script>
import MarkupView from './MarkupView.vue'
import ItemLink from './ItemLink.vue'
import {getBySlug} from './lookup'

export default {
  components: {
    MarkupView,
    ItemLink
  },
  computed: {
    terraform() {
      return getBySlug(this.$route.name, this.$route.params.id);
    },
    text() {
      if(this.terraform) {
        return this.terraform.text;
      }
      return 'No Data';
    }
  }
}
</script>

<style scoped>
.terraform-view {
  display: flex;
  flex-direction: column;
}
</style>
