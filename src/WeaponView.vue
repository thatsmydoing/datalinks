<template>
  <div class="weapon-view info-panel">
    <span>Firepower: {{ item.power }}</span>
    <span v-if="showCost">Cost: {{ item.cost }}</span>
    <span>Prerequisite: <item-link :item="item.prerequisite"></item-link></span>
    <markup-view :text="item.text"></markup-view>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'

export default {
  mixins: [ ViewMixin ],
  computed: {
    showCost() {
      return this.item.power != this.item.cost;
    }
  }
}
</script>

<style scoped>
.weapon-view {
  display: flex;
  flex-direction: column;
}
</style>
