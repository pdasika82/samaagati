import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
const html = await readFile('index.html', 'utf8');
const css = await readFile('styles.css', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate HTML ids');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exactly one main heading is required');
const resources = new Set([...html.matchAll(/(?:src|href)="([^"]+)"/g), ...css.matchAll(/url\(['"]?([^)'" ]+)/g)].map(match => match[1]));
for (const path of resources) {
  if (/^(https?:|mailto:|tel:|data:)/.test(path)) continue;
  if (path.startsWith('#')) assert.ok(ids.includes(path.slice(1)), `Missing anchor ${path}`);
  else await access(path.split('#')[0]);
}
for (const match of html.matchAll(/data-open="([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing dialog ${match[1]}`);
for (const match of html.matchAll(/<img\b[^>]*>/g)) assert.match(match[0], /\balt="[^"]*"/, 'Every image needs an alt attribute');
console.log(`Validated ${resources.size} resource links, ${ids.length} unique anchors, dialog targets, and image alt attributes.`);
