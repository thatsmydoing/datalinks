<template>
  <div class="weapon-view info-panel">
    <div class="general" v-bind:class="{'has-image': image}">
      <img v-if="image" :src="image" />
      <div class="info">
        <span>Firepower: {{ item.power }}</span>
        <span v-if="showCost">Cost: {{ item.cost }}</span>
        <span>Prerequisite: <item-link :item="item.prerequisite"></item-link></span>
      </div>
    </div>
    <markup-view :text="item.text"></markup-view>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'

export default {
  mixins: [ ViewMixin ],
  computed: {
    image() {
      let name = this.item.id.toLowerCase().replace(/ /g, '-');
      return new URL('../img/weapons/'+name+'.png', import.meta.url);
    },
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

.general {
  display: flex;
}

.general.has-image {
  margin: 10px;
}

.general img {
  margin-right: 15px;
  height: 200px;
  width: 260px;
}

.info {
  display: flex;
  flex-direction: column;
}
</style>
