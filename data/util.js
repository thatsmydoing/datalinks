var _ = require('lodash');

function getList(header, text) {
  return getEntry(header, text).split('\n');
}

function getEntry(header, text) {
  var regex = new RegExp('^#'+header+'\n([\\s\\S]*?)\n\n', 'm');
  return regex.exec(text)[1].trim();
}

function getEntries(type, text) {
  var regex = new RegExp('^#'+type+'(\\d+)\n(\n|([\\s\\S]*?)\n\n)', 'mg');

  var match;
  var results = [];
  while((match = regex.exec(text)) != null) {
    var num = parseInt(match[1]);
    var entry = _.trimEnd(match[2], '\n');
    results.push({
      index: num,
      entry: entry
    });
  }
  return results;
}

function parseFlags(effects, flags) {
  return _.flatMap(effects, (effect, index) => {
    if(flags.charAt(index) == '1') {
      return [effect];
    }
    return [];
  });
}

function parseWeights(arr, offset) {
  var weights = {
    conquer: arr[offset],
    discover: arr[offset+1],
    build: arr[offset+2],
    explore: arr[offset+3]
  };
  weights = _.mapValues(weights, parseInt);
  return weights;
}

function splitComma(text, limit) {
  return text.split(/,\s*/);
}

module.exports = {
  getList,
  getEntry,
  getEntries,
  parseFlags,
  parseWeights,
  splitComma
}
