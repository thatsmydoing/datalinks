<template>
  <div v-if="!viewSource" :is="rendered" v-on:keyup="keyHandle"></div>
  <pre class="markup" v-else v-on:keyup="keyHandle">{{ text }}</pre>
</template>

<script>
import {asHtml} from './markup';

export default {
  data() {
    return {
      viewSource: false
    }
  },
  props: {
    text: String
  },
  computed: {
    rendered() {
      return asHtml(this.text)
    }
  },
  created() {
    window.addEventListener('keyup', this.keyHandle);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.keyHandle);
  },
  methods: {
    keyHandle(event) {
      if(event.altKey && event.keyCode == 83) {
        this.viewSource = !this.viewSource;
      }
    }
  }
}
</script>
