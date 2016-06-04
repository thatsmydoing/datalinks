<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {getTechBySlug} from './lookup'

export default {
  computed: {
    title() {
      if(this.$route.name == 'tech') {
        return getTechBySlug(this.$route.params.id).name;
      }
      return 'Unknown';
    }
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
}

body {
  margin: 0px;

  font-family: Helvetica, sans-serif;
  background-image: url('../img/bg.png');
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
