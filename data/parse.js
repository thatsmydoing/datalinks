var fs = require('fs');
var _ = require('lodash');
var util = require('./util');
var tech = require('./tech');
var concept = require('./concept');
var facility = require('./facility');

function readData(name) {
  return fs.readFileSync(name+'.txt', { encoding: 'ASCII' }).replace(/\r/g, '');
}

var alphax = readData('alphax');
var blurbsx = readData('blurbsx');
var conceptsx = readData('conceptsx');
var helpx = readData('helpx');

var techs = tech.parse(alphax, blurbsx);
var concepts = concept.parse(conceptsx);
var facilities = facility.parse(alphax, blurbsx, helpx);

var output = 'module.exports = ' + JSON.stringify({
  techs: techs,
  concepts: concepts.basic,
  advConcepts: concepts.advanced,
  baseFacilities: facilities.base,
  secretProjects: facilities.project
});
fs.writeFileSync('../src/data.js', output);
