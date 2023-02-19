import {
  techs,
  concepts,
  advConcepts,
  baseFacilities,
  secretProjects,
  terraforms,
  factions,
  socEffects,
  socModels,
  abilities,
  chassis,
  reactors,
  weapons,
  armors,
  units,
  help
} from './data'
import {assign, trim, zipObject, map} from 'lodash'

let linkMap = {};
let dictionary = {};

function buildIndex(list, key) {
  var dictionary = zipObject(map(list, key), list);
  function find(id) {
    return dictionary[id];
  }
  return {
    dictionary,
    find
  }
}

function addCategory(slug, name, entries, offset) {
  const list = entries.map(function(item) {
    return assign({
      category: slug,
      slug: trim(item.name
        .toLowerCase()
        .replace(/[()\/\s]+/g, '-')
        .replace(/['.]/g, '')
        .replace(/^the-/, '')
      , '-')
    }, item);
  });
  const bySlug = {};
  list.forEach(function(item) {
    bySlug[item.slug] = item;
    linkMap[(offset + item.index)] = item;
  });

  const category = {};
  category.slug = slug;
  category.name = name;
  category.list = list;
  category.bySlug = bySlug;
  dictionary[slug] = category;
}

addCategory('concept', 'Basic Concepts', concepts, 0);
addCategory('adv-concept', 'Advanced Concepts', advConcepts, 10000);
addCategory('unit', 'Basic Unit Types', units, 30000);
addCategory('chassis', 'Chassis Types', chassis, 40000);
addCategory('reactor', 'Reactor Types', reactors, 50000);
addCategory('weapon', 'Weapons and Modules', weapons, 60000);
addCategory('armor', 'Armor Types', armors, 70000);
addCategory('ability', 'Special Abilities', abilities, 80000);
addCategory('faction', 'Faction Profiles', factions, 150000);
addCategory('tech', 'Tech Advances', techs, 140000);
addCategory('soc-effect', 'Society Effects', socEffects, 130000);
addCategory('soc-model', 'Society Models', socModels, 120000);
addCategory('project', 'Secret Projects', secretProjects, 110070);
addCategory('facility', 'Base Facilities', baseFacilities, 100000);
addCategory('terraform', 'Terraforming', terraforms, 90000);

const techById = {};
dictionary.tech.list.forEach(tech => techById[tech.id] = tech);
dictionary.tech.list.forEach(tech => tech.allows = {});

const unavailable = {
  name: 'Not Available',
  slug: ''
};

function getTechById(id) {
  if(id == 'None') return null;
  if(id == 'Disable') return unavailable;
  return techById[id];
}

function resolveTechs(item) {
  if(!item.prerequisite) return;
  let tech = getTechById(item.prerequisite);
  item.prerequisite = tech;
  if(tech && tech != unavailable) {
    if(!tech.allows[item.category]) {
      tech.allows[item.category] = [];
    }
    tech.allows[item.category].push(item);
  }
}

dictionary.tech.list.forEach(tech => {
  tech.prerequisites = tech.prerequisites.map(getTechById);
  tech.successors = tech.successors.map(getTechById);
});

dictionary.facility.list.forEach(resolveTechs);
dictionary.project.list.forEach(resolveTechs);
dictionary.terraform.list.forEach(resolveTechs);
dictionary.ability.list.forEach(resolveTechs);
dictionary.chassis.list.forEach(resolveTechs);
dictionary.reactor.list.forEach(resolveTechs);
dictionary.weapon.list.forEach(resolveTechs);
dictionary.armor.list.forEach(resolveTechs);
dictionary.unit.list.forEach(resolveTechs);
dictionary['soc-model'].list.forEach(resolveTechs);

const chassisById = buildIndex(dictionary.chassis.list, 'id');
const weaponById = buildIndex(dictionary.weapon.list, 'id');
const armorById = buildIndex(dictionary.armor.list, 'id');
dictionary.unit.list.forEach(unit => {
  unit.chassis = chassisById.find(unit.chassis);
  unit.weapon = weaponById.find(unit.weapon);
  unit.armor = armorById.find(unit.armor);
});

const effectByName = {};
dictionary['soc-effect'].list.forEach(eff => effectByName[eff.name] = eff);
dictionary['soc-model'].list.forEach(model => {
  if(model.effects) {
    model.effects.forEach(eff => {
      eff.effect = effectByName[eff.effect];
    });
  }
});

export function getBySlug(category, slug) {
  return dictionary[category].bySlug[slug];
}

export function getByMarkupLink(id) {
  if(id == 150006 || id == 150007) {
    id -= -7;
  }
  return linkMap[id];
}

export function getCategoryHelp(category) {
  return help[category];
}

export { dictionary };
