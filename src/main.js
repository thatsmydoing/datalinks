import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
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

import {getBySlug, dictionary} from './lookup'

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

const routes = Object.entries(dictionary).map(([_, value]) => {
  const category = value.slug;
  const slugs = value.list.map(item => item.slug);
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
}).reduce((acc, el) => acc.concat(el)).concat([
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/',
    redirect: '/about',
  },
  {
    path: '/(.*)',
    redirect: '/about',
  }
]);

const router = createRouter({
  routes,
  history: createWebHashHistory()
});
router.beforeEach((to) => {
  if(to.name == 'about') {
    return;
  }
  const item = getBySlug(to.name, to.params.id);
  if(!item) {
    return false;
  }
})

const app = createApp(App);
app.use(router);
app.mount('app');
