<template>
  <div class="tech-blurb">
    <markup-view :text="tech.blurb"></markup-view>
    <span v-if="canPlay" class="play" v-on:click="play">
      <span></span>
    </span>
    <audio id="audio" :src="audio" v-on:canplay="ready"></audio>
  </div>
</template>

<script>
import MarkupView from './MarkupView.vue'

export default {
  components: {
    MarkupView
  },
  data() {
    return {
      canPlay: false
    }
  },
  props: {
    tech: Object
  },
  computed: {
    audio() {
      return 'dist/voices/tech'+this.tech.index+'.mp3';
    }
  },
  methods: {
    ready(event) {
      this.canPlay = true;
    },
    play() {
      const el = this.$el.querySelector('#audio');
      el.play();
    }
  }
}
</script>

<style scoped>
.tech-blurb {
  position: relative;
}

.play {
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 21px;
  width: 21px;

  background-image: url('../img/play-frame.png');

  display: flex;
  align-items: center;
  justify-content: center;
}
.play span {
  display: block;
  height: 10px;
  width: 10px;
  margin-right: 2px;
  background-image: url('../img/play.png');
}
.play:hover span {
  background-image: url('../img/play-hover.png');
}
.play:active span {
  background-image: url('../img/play-active.png');
}
</style>

<style>
.tech-blurb .markup {
  color: #588c2c;
  width: 500px;
}
</style>
