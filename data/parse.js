var fs = require('fs');
var _ = require('lodash');
var util = require('./util');
var tech = require('./tech');
var concept = require('./concept');
var facility = require('./facility');
var terraform = require('./terraform');
var faction = require('./faction');
var society = require('./society');

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

var output = 'module.exports = ' + JSON.stringify({
  techs: techs,
  concepts: concepts.basic,
  advConcepts: concepts.advanced,
  baseFacilities: facilities.base,
  secretProjects: facilities.project,
  terraforms: terraforms,
  factions: factions,
  socEffects: societies.effects,
  socModels: societies.models
});
fs.writeFileSync('../src/data.js', output);
