var _ = require('lodash');
var util = require('./util');
var struct = require('./struct');

function parse(alphax, helpx) {
  var list = util.getList('UNITS', alphax)
    .slice(1) // has a 23
    .map(util.splitComma)
    .map(parseUnit)
    .filter(validUnit)

  var byIndex = struct.buildIndex(list, 'index');

  util.getEntries('UNITDESC', helpx).forEach(item => {
    var unit = byIndex.find(item.index)
    if(unit) {
      unit.text = item.entry;
    }
  });

  return list;
}

function parseUnit(arr, index) {
  return {
    name: arr[0],
    index: index,
    chassis: arr[1],
    weapon: arr[2],
    armor: arr[3],
    // plan
    cost: parseInt(arr[5]),
    cargo: parseInt(arr[6]),
    prerequisite: arr[7],
    // special icon
    // special abilities
  }
}

function validUnit(item) {
  return !item.name.startsWith('*');
}

module.exports = { parse }
