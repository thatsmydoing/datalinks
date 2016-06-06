import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import TechView from './TechView.vue'
import ConceptView from './ConceptView.vue'
import FacilityView from './FacilityView.vue'
import TerraformView from './TerraformView.vue'

import {chain, map} from 'lodash'
import {dictionary} from './lookup'

Vue.use(VueRouter)

const router = new VueRouter();
const viewMapping = {
  tech: TechView,
  concept: ConceptView,
  'adv-concept': ConceptView,
  facility: FacilityView,
  project: FacilityView,
  terraform: TerraformView
};
const routeMap = chain(dictionary)
  .map(value => {
    const category = value.slug;
    return [
      '/'+category+'/:id',
      {
        name: category,
        component: viewMapping[category]
      }
    ]
  })
  .fromPairs()
  .value();

const redirect = chain(dictionary)
  .map(value => {
    const category = value.slug;
    let slugs = map(value.list, 'slug');
    slugs.sort();
    return [
      '/'+category+'/',
      '/'+category+'/'+slugs[0]
    ]
  })
  .fromPairs()
  .assign({
    '*': '/concept/'
  })
  .value();

router.map(routeMap);
router.redirect(redirect)
router.start(App, 'app');
