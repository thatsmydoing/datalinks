<template>
  <div id="app">
    <tech-view></tech-view>
  </div>
</template>

<script>
import TechView from './TechView.vue'

export default {
  components: {
    TechView
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
