import { h, resolveComponent, VNode, VNodeArrayChildren } from 'vue'
import { getByMarkupLink } from './lookup'

function replaceTags(text: string): VNodeArrayChildren {
  let result: VNodeArrayChildren = [];
  let lastPos = 0;

  for (const match of text.matchAll(/{(.*?)}/g)) {
    const before = text.substring(lastPos, match.index);
    const italic = match[1];

    result.push(replaceLinks(before));
    result.push(h('em', {}, replaceLinks(italic)));

    lastPos = match.index! + match[0].length;
  }
  result.push(replaceLinks(text.substring(lastPos)));
  return result;
}

function replaceLinks(text: string): VNodeArrayChildren {
  let result: VNodeArrayChildren = [];
  let lastPos = 0;

  for (const match of text.matchAll(/\$LINK<([^=]+)\s*=\s*(\d+)>/g)) {
    const before = text.substring(lastPos, match.index);
    const link = match[1];
    const target = match[2];
    const item = getByMarkupLink(target);

    result.push(before);
    result.push(h(resolveComponent('router-link'), {
      to: {
        name: item.category,
        params: {
          id: item.slug
        }
      }
    }, [link]));

    lastPos = match.index! + match[0].length;
  }
  result.push(text.substring(lastPos));
  return result;
}

export function asHtml(text: string): VNode {
  let result = '';
  let preserve = true;
  text.split('\n').forEach(line => {
    line = line.trim();
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

  const nodes = replaceTags(result);
  return h('pre', { class: 'markup' }, nodes);
}
