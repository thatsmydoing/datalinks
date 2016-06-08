<template>
  <div class="ability-view info-panel">
    <span>Ability: {{ item.description }}</span>
    <span>Cost: {{ cost }}</span>
    <span class="prereq">Prerequisite: <item-link :item="item.prerequisite"></item-link></span>
    <markup-view :text="item.text"></markup-view>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'

export default {
  mixins: [ ViewMixin ],
  computed: {
    cost() {
      const cost = this.item.cost;
      if(cost == -1) {
        return 'Attack/Defense';
      }
      if(cost == -7) {
        return 'Defense+Speed-2';
      }
      return cost;
    }
  }
}
</script>

<style scoped>
.ability-view {
  display: flex;
  flex-direction: column;
}
.prereq {
  margin-top: 10px;
}
</style>
