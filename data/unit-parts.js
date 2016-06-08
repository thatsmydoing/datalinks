var _ = require('lodash');
var util = require('./util');
var struct = require('./struct');

function parse(alphax, helpx) {
  var chassisList = util.getList('CHASSIS', alphax)
    .map(util.splitComma)
    .map(parseChassis)

  addHelp('CHASSISDESC', chassisList, helpx);

  var reactorList = util.getList('REACTORS', alphax)
    .map(util.splitComma)
    .map(parseReactor)

  var reactorHelp = util.getEntry('REACTORDESC', helpx);

  var weaponList = util.getList('WEAPONS', alphax)
    .map(util.splitComma)
    .map(parseWeapon)
    .filter(valid)

  addHelp('WEAPONDESC', weaponList, helpx);

  var armorList = util.getList('DEFENSES', alphax)
    .map(util.splitComma)
    .map(parseArmor)

  var armorHelp = util.getEntry('ARMORDESC', helpx);

  addHelp('ARMORDESC', armorList, helpx);

  return {
    chassis: chassisList,
    reactor: reactorList,
    weapon: weaponList,
    armor: armorList,

    reactorHelp: reactorHelp,
    armorHelp: armorHelp
  }
}

var types = [
  'LAND',
  'SEA',
  'AIR'
];

function parseChassis(arr, index) {
  return {
    name: arr[0],
    index: index,
    moves: parseInt(arr[8]),
    type: types[parseInt(arr[9])],
    fuel: parseInt(arr[10]),
    missile: arr[11] == '1',
    cargo: parseInt(arr[12]),
    cost: parseInt(arr[13]),
    prerequisite: arr[14],
    names: {
      regular: arr[2],
      defensive: arr[4],
      defensive2: arr[6],
      largeOffensive: arr[15],
      largeDefensive: arr[17]
    }
  }
}

function parseReactor(arr, index) {
  return {
    name: arr[0],
    index: index,
    prefix: arr[1],
    power: parseInt(arr[2]),
    prerequisite: arr[3]
  }
}

var weaponModes = [
  'PROJECTILE',
  'ENERGY',
  'MISSILE'
];

function parseWeapon(arr, index) {
  return {
    name: arr[0],
    index: index,
    prefix: arr[1],
    power: parseInt(arr[2]),
    type: weaponModes[parseInt(arr[3])],
    cost: parseInt(arr[4]),
    // icon is always -1
    prerequisite: arr[6]
  }
}

var armorModes = [
  'PROJECTILE',
  'ENERGY',
  'BINARY'
];

function parseArmor(arr, index) {
  return {
    name: arr[0],
    index: index,
    prefix: arr[1],
    armor: parseInt(arr[2]),
    type: armorModes[parseInt(arr[3])],
    cost: parseInt(arr[4]),
    prerequisite: arr[5]
  }
}

function valid(item) {
  return item.prerequisite != 'Disable';
}

function addHelp(header, list, helpx) {
  var index = struct.buildIndex(list, 'index');
  util.getEntries(header, helpx).map(item => {
    index.find(item.index).text = item.entry;
  });
}

module.exports = { parse }
