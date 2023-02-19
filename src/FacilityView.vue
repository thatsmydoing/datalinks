<template>
  <div class="facility-view info-panel">
    <div class="main">
      <div class="general">
        <img :src="image" />
        <div class="info">
          <span>Cost: {{ item.cost * 10 }}</span>
          <span v-if="item.category == 'facility'">Maintenance: {{ item.maintenance }}</span>
          <span class="prereq">Prerequisite: <item-link :item="item.prerequisite"></item-link></span>
        </div>
      </div>
      <markup-view :text="item.text"></markup-view>
    </div>
    <blurb-box :item="item"></blurb-box>
  </div>
</template>

<script>
import {padStart} from 'lodash'
import ViewMixin from './ViewMixin'
import BlurbBox from './BlurbBox.vue'

export default {
  mixins: [ ViewMixin ],
  components: {
    BlurbBox
  },
  computed: {
    image() {
      const num = padStart(this.item.index, 3, '0');
      if(this.$route.name == 'facility') {
        return new URL('../img/facs/fac'+num+'.png', import.meta.url);
      }
      else {
        return new URL('../img/projs/proj'+num+'.png', import.meta.url);
      }
    }
  }
}
</script>

<style scoped>
.facility-view {
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}

.general {
  display: flex;
  margin: 10px;
}

.general img {
  margin: 0px 10px;
}

.info {
  display: flex;
  flex-direction: column;
}

.info .prereq {
  margin-top: 16px;
}

.blurb {
  align-self: center;
}
</style>
