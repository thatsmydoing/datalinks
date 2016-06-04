<template>
  <div class="outer-container" v-bind:class="{'hover': isHovering}" v-on:click="navigate" v-on:mouseenter="hover" v-on:mouseleave="hover">
    <div class="inner-container">
      <h2>{{ tech.name }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tech: Object,
    isHovering: {
      type: Boolean,
      default: false
    },
    main: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hover(event) {
      this.$dispatch('hover', event.type == 'mouseenter' ? this.tech.id : null);
    },
    navigate() {
      this.$dispatch('navigate', this.tech.id)
    }
  },
  ready() {
    if(!this.main) {
      setTimeout(() => {
        var el = this.$el;
        if(el == el.parentElement.querySelector(':hover')) {
          this.$dispatch('hover', this.tech.id);
        }
      }, 0);
      this.$dispatch('redraw');
    }
  }
}
</script>

<style>
.outer-container {
  display: inline-block;
  padding: 2px;
  border: solid 2px #314e2c;
  border-radius: 10px;

  width: 220px;

  margin: 5px 0px;
}

.outer-container:hover, .outer-container.hover {
  border-color: #00eb00;
}

.inner-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 60px;

  background-image: url('../img/bg2.png');

  border-radius: 7px;
  padding: 10px;
}

.outer-container:hover .inner-container, .hover .inner-container {
  border: solid 2px #78a4d4;
  padding: 8px;
}

.inner-container h2 {
  display: flex;
  text-align: center;
  margin: 0px;
}
</style>
