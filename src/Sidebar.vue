<template>
  <div class="ui-wrapper sidebar" :class="showing">
    <template v-if="showCategory">
      <div class="ui-item ui-header">
        <span class="title">Categories</span>
      </div>
      <router-link class="ui-btn item" v-on:click="choose('about')" :to="{ name: 'about' }">
        About
      </router-link>
      <span class="ui-btn item" v-on:click="choose('all')">All Categories</span>
      <router-link
        v-for="item in categories"
        :key="item.slug"
        class="ui-btn item"
        v-on:click="choose(item.slug)"
        :to="`/${item.slug}/`"
      >
        {{ item.name }}
      </router-link>
    </template>
    <template v-if="!showCategory">
      <div class="ui-btn header" v-if="!showCategory" v-on:click="open">
        {{ category }}
      </div>
      <div class="ui-item list">
        <ul ref="scroll">
          <li v-for="link in links" :key="link.key">
            <router-link :class="link.className" :to="link.target">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import {dictionary} from './lookup'

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
        return Object.values(dictionary).reduce((acc, el) => acc.concat(el.list), []);
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
          key: `${item.category}-${item.slug}`,
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
      this.showAll = category == 'all' || category == 'about';
      this.showCategory = false;
    },
    scrollToLink() {
      setTimeout(() => {
        let scrollContainer = this.$refs.scroll;
        let activeLink = this.$el.querySelector(".router-link-active");
        if(scrollContainer && activeLink) {
          let linkRect = activeLink.getBoundingClientRect();
          let scrollRect = scrollContainer.getBoundingClientRect();
          let linkTop = linkRect.top - scrollRect.top;
          if(linkTop < 0) {
            scrollContainer.scrollTop = scrollContainer.scrollTop + linkTop - 10;
          }
          else if(linkTop + linkRect.height > scrollRect.bottom) {
            scrollContainer.scrollTop = scrollContainer.scrollTop + linkTop - scrollRect.height + linkRect.height + 10;
          }
        }
      }, 0);
    }
  },
  mounted() {
    this.scrollToLink();
  },
  watch: {
    $route(val) {
      this.scrollToLink();
    }
  },
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

.sidebar ul li a:hover, .sidebar ul li a.router-link-active {
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

