<template>
  <path :d="path" class="arrow" v-bind:class="{'hover': isHovering}"></path>
</template>

<script>
export default {
  props: {
    height: Number,
    from: Number,
    to: Number,
    isHovering: Boolean
  },
  computed: {
    path() {
      let {from, to} = this;
      const diff = Math.abs(from - to);
      const width = 50;
      const mid = width/2 - 1;
      const end = width - 1;
      const clearanceX = 10;
      const clearanceY = Math.min(diff, 25);
      const sign = from > to ? -1 : 1;
      const instructions = [
        'M0,'+from,
        'L'+clearanceX+','+from,
        'Q'+mid+','+from+' '+mid+','+(from+sign*clearanceY),
        'L'+mid+','+(to-sign*clearanceY),
        'Q'+mid+','+to+' '+(end-clearanceX)+','+to,
        'L'+end+','+to
      ];
      return instructions.join(' ');
    }
  }
}
</script>

<style scoped>
.arrow {
  stroke-width: 1.25px;
  fill: none;
  marker-end: url(#arrow);
  stroke: #314e2c;
}

.arrow.hover {
  marker-end: url(#arrow-hover);
  stroke: #00eb00;
}
</style>
