<template>
  <div class="info-panel">
    <markup-view :text="item.text"></markup-view>
    <template v-if="item.effects">
      <span v-if="item.effects.length == 0">No Effects</span>
      <table v-if="item.effects.length > 0">
        <tr v-for="(e, index) in item.effects" :key="index">
          <td class="amount">{{ e.amount }}</td>
          <td><item-link :item="e.effect"></item-link></td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'

export default {
  mixins: [ ViewMixin ]
}
</script>

<style scoped>
td.amount {
  text-align: right;
}
</style>
