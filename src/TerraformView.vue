<template>
  <div class="terraform-view info-panel">
    <div class="general" v-bind:class="{'has-cell': cell}">
      <map-cell v-if="cell" :cell="cell"></map-cell>
      <div class="info">
        <span>Turns to Complete: {{ item.turns }}</span>
        <span class="prereq">Prerequisite: <item-link :item="item.prerequisite"></item-link></span>
      </div>
    </div>
    <markup-view :text="item.text"></markup-view>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'
import MapCell from './MapCell.vue'

function mkCell(tiles, objects) {
  return {
    tiles: tiles.split(','),
    objects: objects.split(',').filter(t => t != '')
  }
}

const cells = {
  0: mkCell('farmland', 'farm'),
  1: mkCell('farmland', 'soil-enricher'),
  2: mkCell('land', 'mine'),
  3: mkCell('land', 'solar-collector'),
  4: mkCell('land,forest', ''),
  5: mkCell('land,road', ''),
  6: mkCell('land,magtube', ''),
  7: mkCell('land', 'bunker'),
  8: mkCell('land', 'airbase'),
  9: mkCell('land', 'sensor'),
  10: mkCell('land', ''),
  11: mkCell('land,fungus', ''),
  12: mkCell('land', 'condenser'),
  13: mkCell('land', 'echelon-mirror'),
  14: mkCell('land', 'borehole'),
  15: mkCell('land,river', ''),
  20: mkCell('sea', 'kelp'),
  22: mkCell('sea', 'mining-platform'),
  23: mkCell('sea', 'tidal-harness'),
  30: mkCell('sea', ''),
  31: mkCell('sea,seafungus', '')
}

export default {
  mixins: [ ViewMixin ],
  components: {
    MapCell
  },
  computed: {
    cell() {
      return cells[this.item.index]
    }
  }
}
</script>

<style scoped>
.terraform-view {
  display: flex;
  flex-direction: column;
}

.general {
  display: flex;
}

.general.has-cell {
  margin: 10px;
}

.general .map-cell {
  margin-right: 15px;
}

.info {
  display: flex;
  flex-direction: column;
}
</style>
