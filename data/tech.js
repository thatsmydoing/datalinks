var _ = require('lodash');
var util = require('./util');
var struct = require('./struct');

function parse(alphax, blurbsx) {
  var list = util.getList('TECHNOLOGY', alphax)
    .map(util.splitComma)
    .map(parseArray)
    .filter(validTech)

  var byId = struct.buildIndex(list, 'id');
  var byIndex = struct.buildIndex(list, 'index');

  addSuccessors(list, byId.find);
  calculateLevels(list, byId.find);

  util.getEntries('TECH', blurbsx).forEach(item => {
    var tech = byIndex.find(item.index);
    if(tech) {
      tech.blurb = item.entry;
    }
  });
  return list;
}

function parseArray(arr, index) {
  var name = arr[0];
  var id = arr[1];
  var weights = util.parseWeights(arr, 2);
  var prereqs = [];
  if(arr[6] != 'None') {
    prereqs.push(arr[6]);
  }
  if(arr[7] != 'None') {
    prereqs.push(arr[7]);
  }
  var special = parseFlags(arr[8]);
  var direction = getDirection(weights);

  return {
    id,
    index,
    name,
    direction,
    weights,
    prerequisites: prereqs,
    successors: [],
    special
  }
}

function parseFlags(flags) {
  var special = [];
  if(flags.charAt(0) == '1') {
    special.push('FUNGUS_NUTRIENTS');
  }
  if(flags.charAt(1) == '1') {
    special.push('FUNGUS_MINERALS');
  }
  if(flags.charAt(2) == '1') {
    special.push('FUNGUS_ENERGY');
  }
  if(flags.charAt(3) == '1') {
    special.push('GENE_DEFENSE');
  }
  if(flags.charAt(4) == '1') {
    special.push('ALLOW_GENE_ATROCITY');
  }
  if(flags.charAt(5) == '1') {
    special.push('REVEAL_MAP');
  }
  if(flags.charAt(6) == '1') {
    special.push('INCREASE_COMMERCE');
  }
  if(flags.charAt(7) == '1') {
    special.push('PROBE_TEAM_IMPROVE');
  }
  if(flags.charAt(8) == '1') {
    special.push('FREE_TECH');
  }
  return special;
}

function getDirection(weights) {
  var weightList = _.toPairs(weights).map(function(a) {
    return { name: a[0], value: a[1] }
  });
  return _.maxBy(weightList, 'value').name;
}

function validTech(tech) {
  return tech.prerequisites.indexOf('Disable') < 0;
}

function addSuccessors(list, byId) {
  list.forEach(function(tech) {
    tech.prerequisites.map(byId).forEach(function(prereq) {
      prereq.successors.push(tech.id);
    });
  });
}

function calculateLevels(list, byId) {
  var queue = list.filter(tech => tech.prerequisites.length == 0);
  while(queue.length > 0) {
    var tech = queue.shift();
    if(tech.level) {
      continue;
    }
    if(tech.prerequisites.length == 0) {
      tech.level = 1;
    }
    else {
      var prerequisites = tech.prerequisites.map(byId);
      if(_.every(prerequisites, 'level')) {
        tech.level = 1 + _.max(_.map(prerequisites, 'level'))
      }
    }

    if(tech.level) {
      queue = queue.concat(tech.successors.map(byId));
    }
    else {
      queue.push(tech);
    }
  }
}

module.exports = { parse };
