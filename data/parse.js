var fs = require('fs');
var _ = require('lodash');
var util = require('./util');
var tech = require('./tech');
var concept = require('./concept');

function readData(name) {
  return fs.readFileSync(name+'.txt', { encoding: 'ASCII' }).replace(/\r/g, '');
}

var alphax = readData('alphax');
var blurbsx = readData('blurbsx');
var conceptsx = readData('conceptsx');

var techs = tech.parse(alphax, blurbsx);
var concepts = concept.parse(conceptsx);

var output = 'module.exports = ' + JSON.stringify({
  techs: techs,
  concepts: concepts.basic,
  advConcepts: concepts.advanced,
});
fs.writeFileSync('../src/data.js', output);
