import Vue from 'vue'
import sha1 from 'sha1'
import {getByMarkupLink} from './lookup'

function replaceItalic(text) {
  return text.replace(/{(.*?)}/g, '<em>$1</em>');
}

function replaceLinks(text) {
  return text.replace(/\$LINK<([^=]+)\s*=\s*(\d+)>/g, function(match, name, target) {
    var item = getByMarkupLink(target);
    var obj = {};
    if(item) {
      obj = {
        name: item.category,
        params: {
          id: item.slug
        }
      };
    }
    return '<a v-link=\''+JSON.stringify(obj)+'\'>'+name+'</a>';
  });
}

export function asHtml(text) {
  let result = '';
  let preserve = true;
  text.split('\n').forEach(line => {
    if(line.startsWith('^*') || line.startsWith('^(')) {
      if(!preserve) {
        result += '\n';
      }
      result += line.substring(1);
      preserve = false;
    }
    else if(line.startsWith('^')) {
      if(!preserve) {
        result += '\n';
      }
      result += line.substring(1);
      result += '\n';
      preserve = true;
    }
    else {
      if(!preserve && !/\s$/.test(result)) {
        result += ' ';
      }
      result += line;
      preserve = false;
    }
  });
  result = replaceItalic(result);
  result = replaceLinks(result);
  result = '<pre class="markup">'+result+'</pre>';
  let id = sha1(result);
  Vue.partial(id, result);
  return id;
}
