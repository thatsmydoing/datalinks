<template>
  <div class="tech-view">
    <div class="tech-tree">
      <div class="tech-container">
        <tech-card
          v-for="(tech, index) in current.prerequisites"
          :key="index"
          ref="prerequisites"
          @hover="hover"
          :tech="tech"
        >
        </tech-card>
      </div>
      <arrow-container :hovered="hovered" :arrows="prerequisiteArrows"></arrow-container>
      <tech-main-card :tech="current" ref="current" :is-hovering="hovered != null"></tech-main-card>
      <arrow-container :hovered="hovered" :arrows="successorArrows"></arrow-container>
      <div class="tech-container">
        <tech-card
          v-for="(tech, index) in current.successors"
          :key="index"
          ref="successors"
          @hover="hover"
          :tech="tech"
        >
        </tech-card>
      </div>
    </div>
    <blurb-box :item="current"></blurb-box>
  </div>
</template>

<script>
import TechCard from './TechCard.vue'
import TechMainCard from './TechMainCard.vue'
import BlurbBox from './BlurbBox.vue'
import ArrowContainer from './ArrowContainer.vue'

import {getBySlug} from './lookup'

export default {
  components: {
    TechCard,
    TechMainCard,
    BlurbBox,
    ArrowContainer
  },
  data () {
    return {
      hovered: null,
      prerequisiteArrows: [],
      successorArrows: []
    }
  },
  computed: {
    current() {
      return getBySlug('tech', this.$route.params.id);
    }
  },
  methods: {
    redraw() {
      if (!this.$refs.current) return;

      const containerRect = this.$el.getBoundingClientRect();
      const topOffset = containerRect.top;
      const rect = this.$refs.current.$el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - topOffset;
      this.prerequisiteArrows = (this.$refs.prerequisites ?? []).map((c) => {
        const rect = c.$refs.container.getBoundingClientRect();
        const start = rect.top + rect.height / 2 - topOffset;

        return {
          id: c.tech.id,
          from: start,
          to: mid
        }
      });
      this.successorArrows = (this.$refs.successors ?? []).map((c) => {
        const rect = c.$refs.container.getBoundingClientRect();
        const end = rect.top + rect.height / 2 - topOffset;

        return {
          id: c.tech.id,
          from: mid,
          to: end
        }
      });
    },
    hover(on) {
      this.hovered = on;
    }
  },
  created() {
    window.addEventListener('resize', this.redraw);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.redraw);
  },
  mounted() {
    this.redraw();
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.params.id !== oldVal.params.id) {
        this.$nextTick(() => this.redraw(this));
      }
    },
  },
}
</script>

<style scoped>
.tech-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tech-tree {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.tech-container {
  display: flex;
  flex-direction: column;
  width: 228px;
}
</style>
