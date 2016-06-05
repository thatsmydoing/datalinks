<template>
  <partial v-if="!viewSource" :name="rendered" v-on:keyup="keyHandle"></partial>
  <pre class="markup" v-if="viewSource" v-on:keyup="keyHandle">{{ text }}</pre>
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
