<template>
  <div class="terraform-view">
    <span>Turns to Complete: {{ terraform.turns }}</span>
    <span class="prereq">Prerequisite: <a v-link="prerequisiteLink">{{ prerequisite }}</a></span>
    <markup-view :text="text"></markup-view>
  </div>
</template>

<script>
import MarkupView from './MarkupView.vue'
import {getBySlug, getTechById} from './lookup'

export default {
  components: {
    MarkupView
  },
  computed: {
    prerequisite() {
      const prereq = this.terraform.prerequisite;
      if(prereq == 'None') {
        return 'None';
      }
      else {
        return getTechById(prereq).name;
      }
    },
    prerequisiteLink() {
      let prereq = this.terraform.prerequisite;
      if(prereq == 'None') {
        return null;
      }
      prereq = getTechById(prereq);
      return {
        name: 'tech',
        params: { id: prereq.slug }
      }
    },
    terraform() {
      return getBySlug(this.$route.name, this.$route.params.id);
    },
    text() {
      if(this.terraform) {
        return this.terraform.text;
      }
      return 'No Data';
    }
  }
}
</script>

<style>
.terraform-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  min-height: 0px;
  color: #588c2c;
  font-size: 16px;
  font-family: 'sans-serif';
}

.terraform-view a[href] {
  color: #b8c060;
}

.terraform-view .markup {
  font-family: 'sans-serif';
}

.terraform-view .markup a {
  color: #b8c060;
}

.terraform-view .markup em {
  font-style: normal;
  color: #b8c060;
}
</style>
