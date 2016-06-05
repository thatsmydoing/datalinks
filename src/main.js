import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import TechView from './TechView.vue'
import ConceptView from './ConceptView.vue'

Vue.use(VueRouter)

const router = new VueRouter();
router.map({
  '/tech/:id': {
    name: 'tech',
    component: TechView
  },
  '/concept/:id': {
    name: 'concept',
    component: ConceptView
  },
  '/adv-concept/:id': {
    name: 'adv-concept',
    component: ConceptView
  }
})
router.redirect({
  '/concept/': '/concept/altitude',
  '/adv-concept/': '/adv-concept/altitude-advanced',
  '/tech/': '/tech/adaptive-doctrine',
  '*': '/concept/'
})
router.start(App, 'app');
