<template>
  <div class="ui-wrapper sidebar">
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
        <ul>
          <li v-for="link in links">
            <a v-link="link.target">
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
        return {
          name: item.name,
          target: {
            name: item.category,
            params: { id: item.slug }
          }
        }
      });
      links.sort((a, b) => a.name.localeCompare(b.name));
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
</style>

