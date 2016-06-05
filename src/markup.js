import Vue from 'vue'
import sha1 from 'sha1'

function replaceItalic(text) {
  return text.replace(/{(.*?)}/g, '<em>$1</em>');
}

export function asHtml(text) {
  let result = '';
  let preserve = true;
  text.split('\n').forEach(line => {
    if(line.startsWith('^*')) {
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
  result = '<pre class="markup">'+result+'</pre>';
  let id = sha1(result);
  Vue.partial(id, result);
  return id;
}
