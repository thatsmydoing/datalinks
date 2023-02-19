<template>
  <svg>
    <defs>
      <marker id="arrow" markerWidth="13" markerHeight="13" refX="9" refY="6" orient="auto">
        <path d="M2,2 L2,11 L10,6 L2,2" />
      </marker>
      <marker id="arrow-hover" markerWidth="13" markerHeight="13" refX="9" refY="6" orient="auto">
        <path d="M2,2 L2,11 L10,6 L2,2" class="hover" />
      </marker>
    </defs>
    <arrow v-for="arrow in sortedArrows"
      :key="arrow.id"
      :is-hovering="hovered == arrow.id"
      :from="arrow.from"
      :to="arrow.to">
    </arrow>
  </svg>
</template>

<script>
import Arrow from './Arrow.vue'

export default {
  components: {
    Arrow
  },
  props: {
    arrows: Array,
    height: Number,
    hovered: String
  },
  computed: {
    sortedArrows() {
      return this.arrows.sort((a, b) => this.hoverSort(a, b));
    },
  },
  methods: {
    hoverSort(a, b) {
      if(b.id == this.hovered) {
        return -1;
      }
      return 1;
    }
  }
}
</script>

<style scoped>
svg {
  align-self: stretch;
  width: 50px;
}

#arrow {
  fill: #314e2c;
}

#arrow-hover {
  fill: #00eb00;
}
</style>
