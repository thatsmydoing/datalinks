<template>
  <div class="outer-container" v-bind:class="{'hover': isHovering}">
    <div class="inner-container">
      <h2>{{ tech.name }}</h2>
      <h3 :class="tech.direction">{{ tech.direction }} {{ tech.level }}</h3>
      <img :src="image" />
      <div class="allows" v-for="(list, key) in tech.allows" :key="key">
        <span>{{ names[key] }}:</span>
        <span v-for="(item, index) in list" :key="index">
          <item-link :item="item"></item-link>{{extra(item)}}<template v-if="index < list.length - 1">,</template>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {padStart} from 'lodash'
import ItemLink from './ItemLink.vue'

const names = {
  armor: 'Defenses',
  ability: 'Abilities',
  facility: 'Base Facilities',
  project: 'Secret Projects',
  weapon: 'Weapons',
  chassis: 'Chassis Types',
  reactor: 'Reactors',
  unit: 'Unit Types',
  terraform: 'Terraform',
  'soc-model': 'Socio/Economic Model'
}

export default {
  components: {
    ItemLink
  },
  data() {
    return {
      names
    }
  },
  props: {
    isHovering: Boolean,
    tech: Object
  },
  computed: {
    image() {
      const num = padStart(this.tech.index, 3, '0');
      return new URL('../img/tech/tech'+num+'.png', import.meta.url);
    }
  },
  methods: {
    extra(item) {
      let value;
      switch(item.category) {
        case 'chassis':
          return ' ('+item.moves+')';
        case 'weapon':
          value = item.power;
          if(value < 0) {
            value = 'Psi';
          }
          if(value == 0) {
            value = 'Equipment';
          }
          return ' ('+value+')';
        case 'armor':
          value = item.armor;
          if(value < 0) {
            value = 'Psi';
          }
          return ' ('+value+')';
        default:
          return '';
      }
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

.inner-container img {
  margin-bottom: 20px;
}

.allows {
  align-self: stretch;
  color: #588c2c;
  padding-left: 1em;
  text-indent: -1em;
}

.allows a {
  color: #b8c060;
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
