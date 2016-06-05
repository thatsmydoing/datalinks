<template>
  <div class="tech-view">
    <div class="tech-tree">
      <div class="tech-container">
        <tech-card v-for="tech in prerequisites" v-ref:prerequisites :tech="tech"></tech-card>
      </div>
      <arrow-container :hovered="hovered" :arrows="prerequisiteArrows"></arrow-container>
      <tech-main-card :tech="current" v-ref:current :is-hovering="hovered != null"></tech-main-card>
      <arrow-container :hovered="hovered" :arrows="successorArrows"></arrow-container>
      <div class="tech-container">
        <tech-card v-for="tech in successors" v-ref:successors :tech="tech"></tech-card>
      </div>
    </div>
    <div class="tech-blurb">
      {{{ blurb }}}
    </div>
  </div>
</template>

<script>
import TechCard from './TechCard.vue'
import TechMainCard from './TechMainCard.vue'
import ArrowContainer from './ArrowContainer.vue'

import {getTechById, getTechBySlug} from './lookup'
import {asHtml} from './markup'
import {debounce} from 'lodash'

export default {
  components: {
    TechCard,
    TechMainCard,
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
      return getTechBySlug(this.$route.params.id);
    },
    prerequisites() {
      return this.current.prerequisites.map(getTechById);
    },
    successors() {
      return this.current.successors.map(getTechById);
    },
    blurb() {
      return asHtml(this.current.blurb);
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
    redraw() {
      this._redraw(this);
    }
  }
}
</script>

<style>
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

.blurb {
  color: #588c2c;
  white-space: pre-wrap;
  width: 500px;
}
</style>
