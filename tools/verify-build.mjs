import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('dist');
async function walk(directory) {
  return (await Promise.all((await fs.readdir(directory, { withFileTypes: true })).map(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  }))).flat();
}
const files = await walk(root);
const pages = files.filter(file => file.endsWith('.html'));
const exists = async file => !!(await fs.stat(file).catch(() => null));
for (const file of pages) {
  const html = await fs.readFile(file, 'utf8');
  const relative = path.relative(root, file);
  if (relative === 'googlefca9e7c3d344bd1d.html') {
    assert.equal(html.trim(), 'google-site-verification: googlefca9e7c3d344bd1d.html');
    continue;
  }
  assert.match(html, /<title>[^<]+<\/title>/, `${relative}: missing title`);
  assert.match(html, /rel="canonical"/, `${relative}: missing canonical URL`);
  assert.doesNotMatch(html, /Hi, I'm Nano|Untitled post|Lorem ipsum/, `${relative}: sample content leaked`);
  for (const [, target] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!target.startsWith('/') || target.startsWith('//')) continue;
    const pathname = decodeURIComponent(target.split(/[?#]/)[0]);
    const destination = path.resolve(root, '.' + pathname);
    assert.ok(destination === root || destination.startsWith(root + path.sep), `Path escapes output: ${target}`);
    assert.ok(await exists(destination), `${relative}: missing ${target}`);
    if (pathname.endsWith('/')) assert.ok(await exists(path.join(destination, 'index.html')), `Missing index: ${target}`);
  }
}
for (const file of ['index.html', 'about/index.html', 'publications/index.html', 'projects/index.html', 'blog/index.html', 'cv/index.html', '404.html', 'feed.xml', 'robots.txt', 'sitemap-index.xml', '.nojekyll']) {
  assert.ok(await exists(path.join(root, file)), `Missing output: ${file}`);
}
assert.equal(await exists(path.join(root, 'blog/post-template/index.html')), false, 'Draft has a public route');
const feed = await fs.readFile(path.join(root, 'feed.xml'), 'utf8');
assert.match(feed, /<rss\s/);
assert.doesNotMatch(feed, /post-template|Untitled post/);
const sitemap = await fs.readFile(path.join(root, 'sitemap-0.xml'), 'utf8');
assert.doesNotMatch(sitemap, /post-template|404/);
assert.match(sitemap, /https:\/\/jonarck\.github\.io\/projects\//);
console.log(`PASS: ${pages.length} HTML pages, internal links/assets, canonical metadata, RSS/sitemap, legacy About redirect, and unpublished template.`);
