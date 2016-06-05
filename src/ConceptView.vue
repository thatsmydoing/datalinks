<template>
  <div class="concept-view">
    <markup-view :text="text"></markup-view>
  </div>
</template>

<script>
import MarkupView from './MarkupView.vue'
import {getBySlug} from './lookup'

export default {
  components: {
    MarkupView
  },
  computed: {
    concept() {
      return getBySlug(this.$route.name, this.$route.params.id);
    },
    text() {
      if(this.concept) {
        return this.concept.text;
      }
      return 'No Data';
    }
  }
}
</script>

<style>
.concept-view {
  width: 100%;
  overflow-y: auto;
  min-height: 0px;
}

.concept-view .markup {
  color: #588c2c;
  font-size: 16px;
  font-family: 'sans-serif';
}

.concept-view .markup a {
  color: #b8c060;
}

.concept-view .markup em {
  font-style: normal;
  color: #b8c060;
}
</style>
