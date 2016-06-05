var fs = require('fs');
var _ = require('lodash');
var util = require('./util');

function readData(name) {
  return fs.readFileSync(name+'.txt', { encoding: 'ASCII' }).replace(/\r/g, '');
}

var alphax = readData('alphax');
var blurbsx = readData('blurbsx');
var conceptsx = readData('conceptsx');

var techInput = util.getList('TECHNOLOGY', alphax);

var techlist = techInput
.map(function(line) {
  return line.split(/,\s*/);
})
.map(function(arr, index) {
  var name = arr[0];
  var id = arr[1];
  var weights = {
    conquer: arr[2],
    discover: arr[3],
    build: arr[4],
    explore: arr[5]
  };
  var prereqs = [];
  if(arr[6] != 'None') {
    prereqs.push(arr[6]);
  }
  if(arr[7] != 'None') {
    prereqs.push(arr[7]);
  }
  var special = [];
  var flags = arr[8];
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

  weights = _.mapValues(weights, parseInt);
  var weightList = _.toPairs(weights).map(function(a) {
    return { name: a[0], value: a[1] }
  });
  var direction = _.maxBy(weightList, 'value').name;
  return {
    id: id,
    index: index,
    name: name,
    direction: direction,
    weights: weights,
    prerequisites: prereqs,
    successors: [],
    special: special
  };
})

var validTechs = techlist.filter(function(tech) {
  return tech.prerequisites.indexOf('Disable') < 0;
});

var techs = {};
validTechs.forEach(function(tech) {
  techs[tech.id] = tech;
});

function techById(id) {
  return techs[id];
}

validTechs.forEach(function(tech) {
  tech.prerequisites.map(techById).forEach(function(prereq) {
    prereq.successors.push(tech.id);
  });
});


var queue = techlist.filter(function(tech) {
  return tech.prerequisites.length == 0;
});
while(queue.length > 0) {
  var tech = queue.shift();
  if(tech.level) {
    continue;
  }
  if(tech.prerequisites.length == 0) {
    tech.level = 1;
  }
  else {
    var prerequisites = tech.prerequisites.map(techById);
    if(_.every(prerequisites, 'level')) {
      tech.level = 1 + _.max(_.map(prerequisites, 'level'))
    }
  }

  if(tech.level) {
    queue = queue.concat(tech.successors.map(techById));
  }
  else {
    queue.push(tech);
  }
}

util.getEntries('TECH', blurbsx).forEach(function(item) {
  techlist[item.index].blurb = item.entry;
});

var concepts = util.getList('TITLES', conceptsx).map(function(title, index) {
  return { index: index, name: title };
});
util.getEntries('CONCEPT', conceptsx).forEach(function(item) {
  concepts[item.index].text = item.entry;
});

var advConcepts = util.getList('ADVTITLES', conceptsx).map(function(title, index) {
  return { index: index, name: title };
});
util.getEntries('ADVCONCEPT', conceptsx).forEach(function(item) {
  advConcepts[item.index].text = item.entry;
});

var output = 'module.exports = ' + JSON.stringify({
  techs: validTechs,
  concepts: concepts,
  advConcepts: advConcepts
});
fs.writeFileSync('../src/data.js', output);
