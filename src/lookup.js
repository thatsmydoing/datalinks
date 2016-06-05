import {techs, concepts, advConcepts} from './data'
import {assign, trim} from 'lodash'

let linkMap = {};
let dictionary = {};

function addCategory(slug, name, entries, offset) {
  const list = entries.map(function(item) {
    return assign({
      category: slug,
      slug: trim(item.name.toLowerCase().replace(/[()\/\s]+/g, '-'), '-')
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

addCategory('tech', 'Technologies', techs, 140000);
addCategory('concept', 'Basic Concepts', concepts, 0);
addCategory('adv-concept', 'Advanced Concepts', advConcepts, 10000);

const techById = {};
dictionary.tech.list.forEach(tech => techById[tech.id] = tech);

export function getTechById(id) {
  return techById[id];
}

export function getBySlug(category, slug) {
  return dictionary[category].bySlug[slug];
}

export function getByMarkupLink(id) {
  return linkMap[id];
}

export { dictionary };
