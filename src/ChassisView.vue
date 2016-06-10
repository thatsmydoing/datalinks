<template>
  <div class="chassis-view info-panel">
    <span>Moves: {{ moves }}</span>
    <span>Cargo: {{ item.cargo }}</span>
    <span v-if="hasFuel">Fuel: {{ item.fuel }}</span>
    <span>Cost: {{ item.cost }} </span>
    <span>Prerequisite: <item-link :item="item.prerequisite"></item-link></span>
    <markup-view :text="item.text"></markup-view>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'
import {capitalize} from 'lodash'

export default {
  mixins: [ ViewMixin ],
  computed: {
    hasFuel() {
      return this.item.type == 'AIR';
    },
    moves() {
      return capitalize(this.item.type)+' '+this.item.moves;
    }
  }
}
</script>

<style scoped>
.chassis-view {
  display: flex;
  flex-direction: column;
}
</style>
