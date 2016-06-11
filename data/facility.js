var _ = require('lodash');
var util = require('./util');
var struct = require('./struct');

function parse(alphax, blurbsx, helpx) {
  var lines = util.getList('FACILITIES', alphax);
  var facLines = lines.slice(0, 69);
  var projLines = lines.slice(69);

  function idMap(id) {
    if(id > 100) {
      return id / 10;
    }
    if(id > 33) {
      return id + 31;
    }
    return id;
  }

  return {
    base: parseType(
      facLines,
      parseFacility,
      'FAC',
      idMap,
      'HELPFAC',
      blurbsx,
      helpx
    ),
    project: parseType(
      projLines,
      parseSecretProject,
      'PROJECT',
      _.identity,
      'HELPPROJ',
      blurbsx,
      helpx
    )
  }
}

function parseType(lines, parseItem, blurbHeader, idMap, helpHeader, blurbsx, helpx) {
  var list = lines
    .map(util.splitComma)
    .map(parseItem)
    .filter(validBuilding)

  var byIndex = struct.buildIndex(list, 'index');

  addBlurbs(byIndex.find, blurbHeader, idMap, blurbsx);
  addHelp(byIndex.find, helpHeader, helpx);
  return list;
}

function parseFacility(a, index) {
  return {
    index: index+1,
    name: a[0],
    cost: parseInt(a[1]),
    maintenance: parseInt(a[2]),
    prerequisite: a[3],
    // free is unused
    effect: a.slice(5).join(', ')
  }
}

function parseSecretProject(a, index) {
  var result = parseFacility(a, index);
  result.index = index;
  result.aggressiveness = parseInt(a[6]);
  result.weights = util.parseWeights(a, 7);
  return result;
}

function validBuilding(item) {
  return item.prerequisite != 'Disable';
}

function addBlurbs(byIndex, header, idMap, blurbsx) {
  util.getEntries(header, blurbsx).forEach(item => {
    var id = idMap(item.index);
    byIndex(id).blurb = item.entry;
  });
}

function addHelp(byIndex, header, helpx) {
  util.getEntries(header, helpx).forEach(item => {
    byIndex(item.index).text = item.entry;
  });
}

module.exports = { parse };
