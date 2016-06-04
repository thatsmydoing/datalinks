import {techs} from './data'

export const techList = techs.map(tech => {
  return { ...tech, slug: tech.name.toLowerCase().replace(/[\/\s]+/g, '-') };
})

const techById = {};
techList.forEach(tech => techById[tech.id] = tech);
const techBySlug = {};
techList.forEach(tech => techBySlug[tech.slug] = tech);

export function getTechById(id) {
  return techById[id];
}

export function getTechBySlug(slug) {
  return techBySlug[slug];
}
