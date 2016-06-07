<template>
  <div class="blurb">
    <markup-view :text="item.blurb"></markup-view>
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
    item: Object
  },
  computed: {
    audio() {
      let folder = 'none';
      let index = this.item.index;
      switch(this.item.category) {
        case 'tech':
          folder = 'tech';
          break;
        case 'facility':
          folder = 'fac';
          if(index > 60) {
            index -= 31;
          }
          else if(index > 33) {
            index = index * 10;
          }
          break;
        case 'faction':
          folder = '';
          index = this.item.id;
          break;
      }
      return 'dist/voices/'+folder+index+'.mp3';
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
.blurb {
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
.blurb .markup {
  color: #588c2c;
  width: 500px;
  font-size: 12px;
  font-family: monospace;
}
</style>
