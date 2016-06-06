var _ = require('lodash');
var util = require('./util');
var struct = require('./struct');

function parse(alphax, helpx) {
  var list = _.chain(util.getList('TERRAIN', alphax))
    .map(util.splitComma)
    .flatMap(parseEntries)
    .filter(validTerraform)
    .value()

  var byIndex = struct.buildIndex(list, 'index');

  addHelp(byIndex.find, 'HELPTERRALAND', 0, helpx);
  addHelp(byIndex.find, 'HELPTERRASEA', 20, helpx);

  // remove duplicate for land/sea
  return _.uniqBy(list, 'name');
}

function parseEntries(arr, index) {
  var baseName = arr[5];
  var land = {
    index: index,
    name: baseName.replace('$STR0', arr[0]),
    prerequisite: arr[1],
    turns: parseInt(arr[4])
  }
  var sea = {
    index: index + 20,
    name: baseName.replace('$STR0', arr[2]),
    prerequisite: arr[3],
    turns: parseInt(arr[4])
  }
  return [land, sea];
}

function addHelp(byIndex, header, offset, helpx) {
  util.getEntries(header, helpx).forEach(item => {
    const terra = byIndex(item.index + offset);
    if(terra) {
      terra.text = item.entry;
    }
  });
}

function validTerraform(t) {
  return t.prerequisite != 'Disable';
}

module.exports = { parse };
