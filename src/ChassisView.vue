<template>
  <div class="chassis-view info-panel">
    <span>Moves: <span class="moves">{{ moves }}</span></span>
    <span>Cargo: {{ item.cargo }}</span>
    <span v-if="hasFuel">Fuel: {{ item.fuel }}</span>
    <span>Cost: {{ item.cost }} </span>
    <span>Prerequisite: <item-link :item="item.prerequisite"></item-link></span>
    <markup-view :text="item.text"></markup-view>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'

export default {
  mixins: [ ViewMixin ],
  computed: {
    hasFuel() {
      return this.item.type == 'AIR';
    },
    moves() {
      return this.item.type.toLowerCase()+' '+this.item.moves;
    }
  }
}
</script>

<style scoped>
.chassis-view {
  display: flex;
  flex-direction: column;
}

.moves {
  text-transform: capitalize;
}
</style>
