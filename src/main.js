import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import TechView from './TechView.vue'

Vue.use(VueRouter)

const router = new VueRouter();
router.map({
  '/tech/:id': {
    name: 'tech',
    component: TechView
  }
})
router.start(App, 'app');
