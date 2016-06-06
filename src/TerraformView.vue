<template>
  <div class="terraform-view info-panel">
    <span>Turns to Complete: {{ item.turns }}</span>
    <span class="prereq">Prerequisite: <item-link :item="item.prerequisite"></item-link></span>
    <markup-view :text="item.text"></markup-view>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'

export default {
  mixins: [ ViewMixin ]
}
</script>

<style scoped>
.terraform-view {
  display: flex;
  flex-direction: column;
}
</style>
