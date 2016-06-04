<template>
  <div class="tech-view">
    <div class="tech-container">
      <tech-card v-for="tech in prerequisites" v-ref:prerequisites :tech="tech"></tech-card>
    </div>
    <arrow-container :hovered="hovered" :arrows="prerequisiteArrows"></arrow-container>
    <tech-card :tech="current" v-ref:current :is-hovering="hovered != null" :main="true"></tech-card>
    <arrow-container :hovered="hovered" :arrows="successorArrows"></arrow-container>
    <div class="tech-container">
      <tech-card v-for="tech in successors" v-ref:successors :tech="tech"></tech-card>
    </div>
  </div>
</template>

<script>
import TechCard from './TechCard.vue'
import ArrowContainer from './ArrowContainer.vue'

import {techs} from './data'
import {debounce} from 'lodash'

var techMap = {};
techs.forEach(tech => techMap[tech.id] = tech);

export default {
  components: {
    TechCard,
    ArrowContainer
  },
  data () {
    return {
      techs: techMap,
      selected: 'Psych',
      hovered: null,
      prerequisiteArrows: [],
      successorArrows: []
    }
  },
  computed: {
    current() {
      return this.techs[this.selected];
    },
    prerequisites() {
      return this.current.prerequisites.map((id) => this.techs[id]);
    },
    successors() {
      return this.current.successors.map((id) => this.techs[id]);
    }
  },
  methods: {
    _redraw: debounce((self) => {
      const containerRect = self.$el.getBoundingClientRect();
      const topOffset = containerRect.top;
      const rect = self.$refs.current.$el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - topOffset;
      self.prerequisiteArrows = self.$refs.prerequisites.map((c) => {
        const rect = c.$el.getBoundingClientRect();
        const start = rect.top + rect.height / 2 - topOffset;

        return {
          id: c.tech.id,
          from: start,
          to: mid
        }
      });
      self.successorArrows = self.$refs.successors.map((c) => {
        const rect = c.$el.getBoundingClientRect();
        const end = rect.top + rect.height / 2 - topOffset;

        return {
          id: c.tech.id,
          from: mid,
          to: end
        }
      });
    })
  },
  events: {
    hover(on) {
      this.hovered = on;
    },
    navigate(target) {
      this.hovered = null;
      this.selected = target;
    },
    redraw() {
      this._redraw(this);
    }
  }
}
</script>

<style>
.tech-view {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-container {
  display: flex;
  flex-direction: column;
  width: 228px;
}
</style>
