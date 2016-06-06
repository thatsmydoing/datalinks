<template>
  <div class="map-cell">
    <img class="tile" v-for="tile in tiles" :src="tile">
    <img class="object" v-for="object in objects" :src="object">
  </div>
</template>

<script>
function img(name) {
  return require('../img/map/'+name+'.png');
}

export default {
  props: {
    cell: Object
  },
  computed: {
    objects() {
      return this.cell.objects.map(img);
    },
    tiles() {
      return this.cell.tiles.map(img);
    }
  }
}
</script>

<style scoped>
.map-cell {
  position: relative;
  width: 100px;
  height: 50px;
}

.map-cell img {
  position: absolute;
}

.map-cell img.tile {
  top: -3px;
  left: 22px;
  transform: scale(1.26) rotateX(60deg) rotateZ(-45deg);
}
</style>
