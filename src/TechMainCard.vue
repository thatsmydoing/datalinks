<template>
  <div class="outer-container" v-bind:class="{'hover': isHovering}">
    <div class="inner-container">
      <h2>{{ tech.name }}</h2>
      <h3 :class="tech.direction">{{ tech.direction }} {{ tech.level }}</h3>
      <img :src="image" />
    </div>
  </div>
</template>

<script>
import {padStart} from 'lodash'

export default {
  props: {
    isHovering: Boolean,
    tech: Object
  },
  computed: {
    image() {
      const num = padStart(this.tech.index, 3, '0');
      return require('../img/tech/tech'+num+'.png');
    }
  }
}
</script>

<style scoped>
.outer-container {
  display: inline-block;
  padding: 2px;
  border: solid 2px #314e2c;
  border-radius: 10px;

  width: 270px;

  margin: 5px 0px;
}

.outer-container.hover {
  border-color: #00eb00;
}

.inner-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 250px;

  border: solid 2px #233b22;
  border-radius: 7px;
  padding: 8px;
}

.inner-container h2 {
  display: flex;
  text-align: center;
  color: #688cc4;
  margin: 0px;
}

.inner-container h3 {
  text-transform: uppercase;
}

.build {
  color: #e8d48c;
}
.conquer {
  color: #da8677;
}
.discover {
  color: #adc4c0;
}
.explore {
  color: #588c2c;
}
</style>
