import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
let css = fs.readFileSync(path.join(root, 'node_modules/katex/dist/katex.min.css'), 'utf8');

// keep only woff2 sources
css = css.replace(/,url\(fonts\/[^)]+\.woff\) format\("woff"\)/g, '');
css = css.replace(/,url\(fonts\/[^)]+\.ttf\) format\("truetype"\)/g, '');

// drop @font-face blocks for fonts this site never uses
const unused = ['Caligraphic', 'Fraktur', 'Script', 'Typewriter', 'SansSerif'];
css = css.replace(/@font-face\{[^}]*\}/g, (block) =>
  unused.some((n) => block.includes(`KaTeX_${n}`)) ? '' : block
);

css = css.replace(/url\(fonts\//g, 'url(../../node_modules/katex/dist/fonts/');
fs.mkdirSync(path.join(root, 'src/styles'), { recursive: true });
fs.writeFileSync(path.join(root, 'src/styles/katex-lite.css'), css);
console.log('katex-lite.css written,', Math.round(css.length / 1024), 'KB');
