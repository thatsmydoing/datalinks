import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import TechView from './TechView.vue'
import ConceptView from './ConceptView.vue'
import FacilityView from './FacilityView.vue'
import TerraformView from './TerraformView.vue'
import FactionView from './FactionView.vue'
import SocietyModelView from './SocietyModelView.vue'
import AbilityView from './AbilityView.vue'
import ChassisView from './ChassisView.vue'
import ReactorView from './ReactorView.vue'
import WeaponView from './WeaponView.vue'
import ArmorView from './ArmorView.vue'
import UnitView from './UnitView.vue'
import AboutView from './AboutView.vue'

import {chain, map} from 'lodash'
import {getBySlug, dictionary} from './lookup'

Vue.use(VueRouter)

const viewMapping = {
  tech: TechView,
  concept: ConceptView,
  'adv-concept': ConceptView,
  facility: FacilityView,
  project: FacilityView,
  terraform: TerraformView,
  faction: FactionView,
  'soc-effect': ConceptView,
  'soc-model': SocietyModelView,
  ability: AbilityView,
  chassis: ChassisView,
  reactor: ReactorView,
  weapon: WeaponView,
  armor: ArmorView,
  unit: UnitView
};

const routes = Object.entries(dictionary).flatMap(([_, value]) => {
  const category = value.slug;
  const slugs = map(value.list, 'slug');
  if(category != 'soc-model') {
    slugs.sort();
  }
  return [
    {
      path: '/'+category+'/:id',
      name: category,
      component: viewMapping[category]
    },
    {
      path: '/'+category+'/',
      redirect: '/'+category+'/'+slugs[0]
    }
  ];
}).concat([
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '*',
    redirect: '/about',
  }
]);

const router = new VueRouter({ routes });
router.beforeEach((to, _from, next) => {
  if(to.name == 'about') {
    next();
    return;
  }
  const item = getBySlug(to.name, to.params.id);
  if(!item) {
    abort('404');
  }
  next();
})

new Vue({
  el: 'app',
  router,
  render: h => h(App),
});
