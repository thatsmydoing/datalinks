var _ = require('lodash');

function buildIndex(list, key) {
  var dictionary = _.zipObject(_.map(list, key), list);
  function find(id) {
    return dictionary[id];
  }
  return {
    dictionary,
    find
  }
}

module.exports = { buildIndex }
