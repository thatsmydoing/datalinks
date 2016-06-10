<template>
  <div class="reactor-view info-panel">
    <span>Power: {{ item.power }}</span>
    <span>Prerequisite: <item-link :item="item.prerequisite"></item-link></span>
    <markup-view :text="help"></markup-view>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'
import {getCategoryHelp} from './lookup'

export default {
  mixins: [ ViewMixin ],
  computed: {
    help() {
      return getCategoryHelp('reactor');
    }
  }
}
</script>

<style scoped>
.reactor-view {
  display: flex;
  flex-direction: column;
}
</style>
