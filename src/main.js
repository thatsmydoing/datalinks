import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import TechView from './TechView.vue'
import ConceptView from './ConceptView.vue'
import FacilityView from './FacilityView.vue'
import TerraformView from './TerraformView.vue'

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
  },
  '/facility/:id': {
    name: 'facility',
    component: FacilityView
  },
  '/project/:id': {
    name: 'project',
    component: FacilityView
  },
  '/terraform/:id': {
    name: 'terraform',
    component: TerraformView
  }
})
router.redirect({
  '/concept/': '/concept/altitude',
  '/adv-concept/': '/adv-concept/altitude-advanced',
  '/tech/': '/tech/adaptive-doctrine',
  '/facility/': '/facility/aerospace-complex',
  '/project/': '/project/ascent-to-transcendence',
  '/terraform/': '/terraform/build-mag-tube',
  '*': '/concept/'
})
router.start(App, 'app');
