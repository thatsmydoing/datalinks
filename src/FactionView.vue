<template>
  <div class="faction-view info-panel">
    <div class="main">
      <img class="pic" :src="pic">
      <div class="info">
        <div class="overview">
          <markup-view :text="item.overview"></markup-view>
        </div>
        <div class="effects">
          <markup-view :text="item.effects"></markup-view>
        </div>
      </div>
    </div>
    <blurb-box :item="item"></blurb-box>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'
import BlurbBox from './BlurbBox.vue'

export default {
  mixins: [ ViewMixin ],
  components: {
    BlurbBox
  },
  computed: {
    pic() {
      return new URL('../img/factions/'+this.item.id+'.png', import.meta.url);
    }
  }
}
</script>

<style scoped>
.faction-view {
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
  flex: 1;
}

.pic {
  width: 164px;
  height: 198px;
}

.info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.info .overview {
  font-weight: bold;
}

.blurb {
  align-self: center;
}
</style>

<style>
.faction-view .info .markup {
  margin: 0px;
}
</style>
