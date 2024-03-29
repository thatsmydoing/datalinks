var fs = require('fs');
var _ = require('lodash');
var util = require('./util');
var tech = require('./tech');
var concept = require('./concept');
var facility = require('./facility');
var terraform = require('./terraform');
var faction = require('./faction');
var society = require('./society');
var ability = require('./ability');
var unitParts = require('./unit-parts');
var unit = require('./unit');

function readData(name) {
  return fs.readFileSync(name+'.txt', { encoding: 'ASCII' }).replace(/\r/g, '');
}

var _factions = [
  'gaians',
  'hive',
  'univ',
  'morgan',
  'spartans',
  'believe',
  'peace',
  'cyborg',
  'pirates',
  'drone',
  'angels',
  'fungboy',
  'caretake',
  'usurper'
];

var alphax = readData('alphax');
var blurbsx = readData('blurbsx');
var conceptsx = readData('conceptsx');
var helpx = readData('helpx');

var techs = tech.parse(alphax, blurbsx);
var concepts = concept.parse(conceptsx);
var facilities = facility.parse(alphax, blurbsx, helpx);
var terraforms = terraform.parse(alphax, helpx);
var factions = _factions.map((name, index) => {
  var data = readData('factions/'+name);
  return faction.parse(name, data, index+1);
});
var societies = society.parse(alphax, helpx, techs);
var abilities = ability.parse(alphax, helpx);
var unitParts = unitParts.parse(alphax, helpx);
var units = unit.parse(alphax, helpx);

const exportData = {
  techs: techs,
  concepts: concepts.basic,
  advConcepts: concepts.advanced,
  baseFacilities: facilities.base,
  secretProjects: facilities.project,
  terraforms: terraforms,
  factions: factions,
  socEffects: societies.effects,
  socModels: societies.models,
  abilities: abilities,
  chassis: unitParts.chassis,
  reactors: unitParts.reactor,
  weapons: unitParts.weapon,
  armors: unitParts.armor,
  units: units,

  help: {
    reactor: unitParts.reactorHelp,
    armor: unitParts.armorHelp
  }
};

var output = '';
for (const [name, data] of Object.entries(exportData)) {
  output += `
  export const ${name} = ${JSON.stringify(data)};
  `;
}
fs.writeFileSync('../src/data.js', output);
