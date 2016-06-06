import {
  techs,
  concepts,
  advConcepts,
  baseFacilities,
  secretProjects,
  terraforms
} from './data'
import {assign, trim} from 'lodash'

let linkMap = {};
let dictionary = {};

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
addCategory('tech', 'Technologies', techs, 140000);
addCategory('facility', 'Base Facilities', baseFacilities, 100000);
addCategory('project', 'Secret Projects', secretProjects, 100070);
addCategory('terraform', 'Terraforming', terraforms, 90000);

const techById = {};
dictionary.tech.list.forEach(tech => techById[tech.id] = tech);

function getTechById(id) {
  if(id == 'None') return null;
  return techById[id];
}

function resolveTechs(item) {
  item.prerequisite = getTechById(item.prerequisite);
}

dictionary.tech.list.forEach(tech => {
  tech.prerequisites = tech.prerequisites.map(getTechById);
  tech.successors = tech.successors.map(getTechById);
});

dictionary.facility.list.forEach(resolveTechs);
dictionary.project.list.forEach(resolveTechs);
dictionary.terraform.list.forEach(resolveTechs);

export function getBySlug(category, slug) {
  return dictionary[category].bySlug[slug];
}

export function getByMarkupLink(id) {
  if(id >= 110000 && id < 120000) {
    id -= 10000;
  }
  return linkMap[id];
}

export { dictionary };
