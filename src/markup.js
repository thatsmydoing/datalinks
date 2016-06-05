function replaceItalic(text) {
  return text.replace(/{(.*?)}/g, '<em>$1</em>');
}

export function asHtml(text) {
  let result = '';
  let first = true;
  text.split('\n').forEach(line => {
    if(line.startsWith('^')) {
      if(!first) {
        result += '\n';
      }
      result += line.substring(1);
    }
    else {
      if(!first && !/\s$/.test(result)) {
        result += ' ';
      }
      result += line;
    }
    first = false;
  });
  result = replaceItalic(result);
  return '<pre class="blurb">'+result+'</pre>'
}
