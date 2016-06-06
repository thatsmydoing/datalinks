<template>
  <div class="facility-view info-panel">
    <div class="main">
      <div class="general">
        <img :src="image" />
        <div class="info">
          <span>Cost: {{ facility.cost * 10 }}</span>
          <span v-if="facility.category == 'facility'">Maintenance: {{ facility.maintenance }}</span>
          <span class="prereq">Prerequisite: <a v-link="prerequisiteLink">{{ prerequisite }}</a></span>
        </div>
      </div>
      <markup-view :text="text"></markup-view>
    </div>
    <blurb-box :item="facility"></blurb-box>
  </div>
</template>

<script>
import {padStart} from 'lodash'
import BlurbBox from './BlurbBox.vue'
import MarkupView from './MarkupView.vue'
import {getBySlug, getTechById} from './lookup'

export default {
  components: {
    BlurbBox,
    MarkupView
  },
  computed: {
    facility() {
      return getBySlug(this.$route.name, this.$route.params.id);
    },
    prerequisite() {
      const prereq = this.facility.prerequisite;
      if(prereq == 'None') {
        return 'None';
      }
      else {
        return getTechById(prereq).name;
      }
    },
    prerequisiteLink() {
      let prereq = this.facility.prerequisite;
      if(prereq == 'None') {
        return null;
      }
      prereq = getTechById(prereq);
      return {
        name: 'tech',
        params: { id: prereq.slug }
      }
    },
    image() {
      const num = padStart(this.facility.index, 3, '0');
      if(this.$route.name == 'facility') {
        return require('../img/facs/fac'+num+'.png');
      }
      else {
        return require('../img/projs/proj'+num+'.png');
      }
    },
    text() {
      if(this.facility) {
        return this.facility.text;
      }
      return 'No Data';
    },
    blurb() {
      if(this.facility) {
        return this.facility.blurb;
      }
      return 'No Data';
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
