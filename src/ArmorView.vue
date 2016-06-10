<template>
  <div class="armor-view info-panel">
    <span>Strength: {{ strength }}</span>
    <span>Prerequisite: <item-link :item="item.prerequisite"></item-link></span>
    <markup-view :text="help"></markup-view>
    <markup-view v-if="item.text" :text="item.text"></markup-view>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'
import {getCategoryHelp} from './lookup'

export default {
  mixins: [ ViewMixin ],
  computed: {
    help() {
      return getCategoryHelp('armor');
    },
    strength() {
      if(this.item.armor == -1) {
        return 'Psi';
      }
      return this.item.armor;
    }
  }
}
</script>

<style scoped>
.armor-view {
  display: flex;
  flex-direction: column;
}
</style>

