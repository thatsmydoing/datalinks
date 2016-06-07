var _ = require('lodash');
var util = require('./util');
var struct = require('./struct');

function parse(alphax, helpx, techs) {
  var lines = util.getList('SOCIO', alphax);

  var effects = util.splitComma(lines[0]).map(parseEffect);
  util.getEntries('HELPEFFECT', helpx).map(item => {
    effects[item.index].text = item.entry;
  })
  effects = effects.filter(e => e.text != '');

  var categories = util.splitComma(lines[2])
    .map(parseCategory.bind(null, lines))

  categories.forEach(addHelp.bind(null, helpx))

  var models = _.flatMap(categories, category => {
    var list = category.models;
    delete category.models;
    return [category].concat(list);
  });

  var techIndex = struct.buildIndex(techs, 'id');
  models.forEach(resolveLinks.bind(null, techIndex.find));

  return {
    effects,
    models
  }
}

function parseEffect(effect, index) {
  return {
    name: effect,
    index: index
  }
}

function parseCategory(lines, name, index) {
  var start = 3+index*4;
  var models = lines.slice(start, start+4)
    .map(util.splitComma)
    .map(parseModel.bind(null, index*5+1))
  return {
    name: name,
    id: index,
    index: index*5,
    models: models
  }
}

function parseModel(offset, arr, index) {
  var effects = arr.slice(2)
    .filter(s => s != '')
    .map(effect => {
      var result = /([+-]+)(.*)/.exec(effect);
      var amount = result[1].length * (result[1].charAt(0) == '+' ? 1 : -1);
      var target = result[2];
      return {
        effect: target,
        amount: amount
      }
    })
  return {
    name: arr[0],
    prerequisite: arr[1],
    effects: effects,
    index: offset+index
  }
}

function addHelp(helpx, category) {
  var header = 'HELPSOC'+category.id;
  category.text = util.getEntry(header, helpx);
  util.getEntries(header, helpx).forEach(item => {
    category.models[item.index].text = item.entry;
  });
}

function resolveLinks(techIndex, model) {
  if(model.prerequisite && model.prerequisite != 'None') {
    var tech = techIndex(model.prerequisite);
    model.text = model.text
      .replace(/\$STR0/, tech.name)
      .replace(/\$NUM0/, 140000+tech.index)
  }
}

module.exports = { parse }
