var _ = require('lodash');
var util = require('./util');
var struct = require('./struct');

function parse(alphax, helpx) {
  var list = util.getList('ABILITIES', alphax)
    .map(util.splitComma)
    .map(parseAbility)
    .filter(validAbility)

  var byIndex = struct.buildIndex(list, 'index');

  addHelp(byIndex.find, helpx);
  return list;
}

var flagEffects = [
  'ONLY_PROBE',
  'EXPENSIVE_LAND',
  'DISALLOW_FAST', // unused
  'ONLY_TRANSPORT',
  'DISALLOW_PSI',
  'DISALLOW_PROBE',
  'ALLOW_NONCOMBAT',
  'ALLOW_TERRAFORM',
  'ALLOW_COMBAT',
  'ALLOW_AIR',
  'ALLOW_SEA',
  'ALLOW_LAND'
];

function parseAbility(arr, index) {
  return {
    name: arr[0],
    cost: parseInt(arr[1]),
    prerequisite: arr[2],
    abbreviation: arr[3],
    special: util.parseFlags(flagEffects, arr[4]),
    description: arr[5],
    index: index
  }
}

function validAbility(ability) {
  return ability.prerequisite != 'Disable';
}

function addHelp(byIndex, helpx) {
  util.getEntries('ABILDESC', helpx).forEach(item => {
    byIndex(item.index).text = item.entry;
  });
}

module.exports = { parse }
