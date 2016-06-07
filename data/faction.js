var util = require('./util');

function parse(name, data, index) {
  var info = util.getList(name.toUpperCase(), data);
  var arr = util.splitComma(info[0]);

  var datalinks = util.getEntries('DATALINKS', data);

  var faction = {
    id: name,
    name: arr[0],
    index: index,
    blurb: util.getList('BLURB', data).join('\n'),
    overview: datalinks[0].entry,
    effects: datalinks[1].entry
  }

  return faction;
}

function parseDetailed(name, data) {
  var info = util.getList(name.toUpperCase(), data);
  var arr = util.splitComma(info[0]);
  var titles = util.splitComma(info[6].substring(2));

  var datalinks = util.getEntries('DATALINKS', data);

  var faction = {
    name: arr[0],
    description: arr[1],
    noun: arr[2],
    gender: arr[3],
    plural: parseInt(arr[4]) > 1,
    leader: {
      name: arr[5],
      gender: arr[6],
      title: titles[0]
    },
    aggressiveness: parseInt(arr[7]),
    weights: util.parseWeights(arr, 8),
    blurb: util.getList('BLURB', data).join('\n'),
    overview: datalinks[0].entry,
    effects: datalinks[1].entry
  }

  return faction;
}

module.exports = { parse, parseDetailed }
