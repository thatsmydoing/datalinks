<template>
  <div class="concept-view">
    <partial :name='text'></partial>
  </div>
</template>

<script>
import {asHtml} from './markup';
import {getBySlug} from './lookup'

export default {
  computed: {
    concept() {
      return getBySlug(this.$route.name, this.$route.params.id);
    },
    text() {
      if(this.concept) {
        return asHtml(this.concept.text);
      }
      return asHtml('No Data');
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
