<template>
  <div class="info-panel">
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
