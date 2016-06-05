var util = require('./util');

function parseType(conceptsx, titleHeader, textHeader) {
  var concepts = util.getList(titleHeader, conceptsx).map(function(title, index) {
    return { index: index, name: title };
  });
  util.getEntries(textHeader, conceptsx).forEach(function(item) {
    concepts[item.index].text = item.entry;
  });
  return concepts;
}

function parse(conceptsx) {
  return {
    basic: parseType(conceptsx, 'TITLES', 'CONCEPT'),
    advanced: parseType(conceptsx, 'ADVTITLES', 'ADVCONCEPT')
  }
}

module.exports = { parse };
