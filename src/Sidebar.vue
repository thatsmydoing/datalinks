<template>
  <div class="ui-wrapper sidebar">
    <div class="ui-item ui-header">
      <span class="title">{{category}}</span>
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
  </div>
</template>

<script>
import {techList} from './lookup'

export default {
  computed: {
    category() {
      if(this.$route.name == 'tech') {
        return 'Technologies';
      }
      return 'Unknown';
    },
    links() {
      if(this.$route.name == 'tech') {
        let links = techList.map(tech => {
          return {
            name: tech.name,
            target: {
              name: 'tech',
              params: { id: tech.slug }
            }
          }
        });
        links.sort((a, b) => a.name.localeCompare(b.name));
        return links;
      }
      return [];
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
  background-image: url(../img/bg2.png)
}

.list.ui-item {
  flex: 1;
  padding: 0px;
  padding-right: 2px;
  min-height: 0px;
}
</style>
