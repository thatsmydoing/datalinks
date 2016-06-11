<template>
  <div class="ui-wrapper sidebar" :class="showing">
    <template v-if="showCategory">
      <div class="ui-item ui-header">
        <span class="title">Categories</span>
      </div>
      <span class="ui-btn item" v-on:click="choose('all')">All Categories</span>
      <a v-for="item in categories"
        class="ui-btn item"
        v-on:click="choose(item.slug)"
        v-link="{name: item.slug, params: {id: ''}}">

        {{ item.name }}
      </a>
    </template>
    <template v-if="!showCategory">
      <div class="ui-btn header" v-if="!showCategory" v-on:click="open">
        {{ category }}
      </div>
      <div class="ui-item list">
        <ul v-el:scroll>
          <li v-for="link in links">
            <a :class="link.className" v-link="link.target">
              {{ link.name }}
            </a>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import {dictionary} from './lookup'
import {flatMap} from 'lodash'

export default {
  data() {
    return {
      categories: dictionary,
      showAll: true,
      showCategory: false
    }
  },
  computed: {
    dictionary() {
      return dictionary[this.$route.name];
    },
    showing() {
      if(this.showAll) {
        return 'all';
      }
      else {
        return this.$route.name;
      }
    },
    category() {
      if(this.showAll) {
        return 'All Categories';
      }
      if(this.dictionary) {
        return this.dictionary.name;
      }
      return 'Unknown';
    },
    list() {
      if(this.showAll) {
        return flatMap(dictionary, (item) => item.list);
      }
      if(this.dictionary) {
        return this.dictionary.list;
      }
      return [];
    },
    links() {
      let links = this.list.map(item => {
        var name = item.name;
        var className = item.category;
        if(item.category == 'project') {
          name = name.replace(/^The /, '')
        }
        if(item.category == 'soc-model') {
          className += ' color'+Math.floor(item.index/5);
        }
        return {
          name: name,
          className,
          target: {
            name: item.category,
            params: { id: item.slug }
          }
        }
      });
      if(this.showing != 'soc-model') {
        links.sort((a, b) => a.name.localeCompare(b.name));
      }
      return links;
    }
  },
  methods: {
    open() {
      this.showCategory = true;
    },
    choose(category) {
      this.showAll = category == 'all';
      this.showCategory = false;
    }
  },
  watch: {
    $route(val) {
      setTimeout(() => {
        let scrollContainer = this.$els.scroll;
        let activeLink = this.$el.querySelector(".v-link-active");
        let linkTop =
          activeLink.getBoundingClientRect().top -
          scrollContainer.getBoundingClientRect().top;
        scrollContainer.scrollTop = scrollContainer.scrollTop + linkTop - 10;
      }, 0);
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 16px;
}

.sidebar {
  width: 250px;
}

.sidebar ul {
  overflow-y: scroll;
  list-style-type: none;
  padding: 5px 0px;
  margin: 0px;
  width: 100%;
}

.sidebar ul li a {
  display: block;
  padding: 0px 5px;
  color: #688cc4;
  text-decoration: none;
}

.sidebar ul li a:hover, .sidebar ul li a.v-link-active {
  color: black;
  background-image: url(../img/btn.png)
}

.header.ui-btn {
  border-radius: 7px;
}

.item.ui-btn {
  margin: 1px 3px;
}

.list.ui-item {
  flex: 1;
  padding: 0px;
  padding-right: 2px;
  min-height: 0px;
}

.soc-model .color0 {
  color: white;
}
.soc-model .color1 {
  color: cyan;
}
.soc-model .color2 {
  color: magenta;
}
.soc-model .color3 {
  color: blue;
}
</style>

