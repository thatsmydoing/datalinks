<template>
  <div id="app">
    <sidebar></sidebar>
    <div class="ui-wrapper content">
      <div class="ui-item ui-header">
        <span class="title">{{title}}</span>
      </div>
      <div class="ui-item content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'

import {getBySlug} from './lookup'

export default {
  components: {
    Sidebar
  },
  computed: {
    title() {
      if(this.$route.name == 'about') {
        return 'Datalinks';
      }
      const item = getBySlug(this.$route.name, this.$route.params.id);
      if(item) {
        return item.name;
      }
      return 'Unknown';
    }
  }
}
</script>

<style>
@import './scrollbar.css';
@import './button.css';
@import './info-panel.css';

html, body {
  width: 100%;
  height: 100%;
}

body {
  margin: 0px;
  background-color: black;
  color: #688cc4;

  font-family: Helvetica, sans-serif;
}

.ui-header {
  flex-shrink: 0;
}

.ui-wrapper {
  display: flex;
  flex-direction: column;
  border: solid 2px #314e2c;
  border-radius: 12px;
  padding: 2px;
  margin: 5px;
}

.ui-item {
  display: flex;
  justify-content: center;
  border: solid 2px #314e2c;
  border-radius: 7px;
  padding: 5px;
  margin: 2px;
  background-image: url('../img/bg.png');
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
}

.markup {
  white-space: pre-wrap;
}
</style>

<style scoped>
.title {
  font-weight: bold;
  font-size: 24px;
}

.content {
  flex: 1;
}
</style>
