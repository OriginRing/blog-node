import { parse as parseFileName } from 'path';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { marked, Renderer } from 'marked';
import slug from 'github-slugger';
import Prism from 'prismjs';
import md5 from 'md5';
import { loadFront as parseMarkDownWithYAML } from 'yaml-front-matter';

const githubSlugger = new slug();

export interface article {
  id: string;
  name: string;
  author: string;
  introduce: string;
  date: string;
}

class ArticleRender extends Renderer {
  heading(text: string, level: number) {
    const slugText = githubSlugger.slug(text);
    if (level === 1) {
      return '';
    }
    return `<h${level} id="${slugText}">${text}</h${level}>`;
  }

  code(code: string, lang: string) {
    const language = Prism.languages[lang] || Prism.languages.javascript;
    const highlight = Prism.highlight(code, language, lang || 'javascript');
    return `<pre class="code"><code class="language-${lang}">${highlight}</code></pre>`;
  }

  image(href: string | null, title: string | null) {
    return `<img class="" src="${href}" alt="${title}">`;
  }

  link(href: string | null, title: string | null, text: string) {
    return `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
  }
}

export const markedFunction = (path: string) => {
  const articleList = readdirSync(path);
  const list: article[] = [];
  if (!existsSync(`${process.cwd()}/json`)) {
    mkdirSync(`${process.cwd()}/json`);
  }
  articleList.forEach(item => {
    const { name } = parseFileName(`${path}/${item}`);
    const id = md5(name);
    const data = readFileSync(`${path}/${item}`, 'utf8');
    const { author, date, introduce, __content } = parseMarkDownWithYAML(data);
    const str = marked(__content.toString(), { renderer: new ArticleRender() });
    const json = {
      id,
      name,
      author,
      introduce,
      date,
      content: str
    };
    writeFileSync(`${process.cwd()}/json/${id}.json`, JSON.stringify(json));
    list.push({
      id,
      name,
      author,
      date,
      introduce
    });
  });
  list.sort((a, b) => (new Date(b.date).getTime() || new Date(a.date).getTime() > 0 || 0 ? -1 : 1));
  writeFileSync(`${process.cwd()}/json/list.json`, JSON.stringify(list));
};
