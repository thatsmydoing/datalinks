function getList(header, text) {
  var regex = new RegExp('^#'+header+'[\\s\\S]*?\n\n', 'm');
  var lines = regex.exec(text)[0].trim().split('\n');
  lines.shift();
  return lines;
}

function getEntries(type, text) {
  var regex = new RegExp('^#'+type+'(\\d+)\n([\\s\\S]*?)\n\n', 'mg');

  var match;
  var results = [];
  while((match = regex.exec(text)) != null) {
    var num = parseInt(match[1]);
    var entry = match[2];
    results.push({
      index: num,
      entry: entry
    });
  }
  return results;
}

function splitComma(text, limit) {
  return text.split(/,\s*/);
}

module.exports = {
  getList,
  getEntries,
  splitComma
}
